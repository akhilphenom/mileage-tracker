import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Document {
    _id: string,
    __v?: string
}

export interface IRefuelingRecord extends Document {
    date: string;
    odometerStart: number;
    odometerEnd: number;
    fuelConsumed: number;
    fuelPrice: number;
}

export interface IVehicle extends Document {
    name: string;
    refuelingRecords: IRefuelingRecord[];
}

export interface IUserProfile extends Document {
    name: string;
    nickname: string;
    email: string;
    passcode: string;
    vehicles: IVehicle[];
}

export interface AppState {
    currentUserId: string | null;
    users: { [userId: string]: IUserProfile };
    login: (user: IUserProfile) => void;
    logout: () => void;
    addUser: (user: IUserProfile) => void;
    removeUser: (userId: string) => void;
    addVehicle: (vehicle: Omit<IVehicle, 'refuelingRecords'>) => void;
    removeVehicle: (vehicleId: string) => void;
    addRefuelingRecord: (vehicleId: string, record: Omit<IRefuelingRecord, 'id'>) => void;
    editRefuelingRecord: (vehicleId: string, recordId: string, updates: Partial<IRefuelingRecord>) => void;
    deleteRefuelingRecord: (vehicleId: string, recordId: string) => void;
    getVehicleInsights: (vehicleId: string) => {
        avgFuelConsumption: number;
        lastFuelConsumption: number;
        monthlyExpenses: { 
            [month: string]: number 
        };
    };
}

const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            currentUserId: null,
            users: {},
            login: (user: IUserProfile) => {
                const { _id, name, nickname, email, vehicles } = user;
                if (!get().users[_id]) {
                    get().addUser(user);
                }
                set({ currentUserId: _id });
            },
            logout: () => set({ currentUserId: null }),
            addUser: (user) => set((state) => ({
                users: {
                    ...state.users,
                    [user._id]: {
                        ...user,
                        vehicles: []
                    }
                }
            })),
            removeUser: (userId) => set((state) => {
                const { [userId]: _, ...restUsers } = state.users;
                return { 
                    users: restUsers, 
                    currentUserId: state.currentUserId == userId ? null : state.currentUserId 
                };
            }),
            addVehicle: (vehicle) => set((state) => {
                if (!state.currentUserId) return state;
                const currentUser = state.users[state.currentUserId];
                return {
                    users: {
                        ...state.users,
                        [state.currentUserId]: {
                            ...currentUser,
                            vehicles: [...currentUser.vehicles, { ...vehicle, refuelingRecords: [] }]
                        }
                    }
                };
            }),
            removeVehicle: (vehicleId) => set((state) => {
                if (!state.currentUserId) return state;
                const currentUser = state.users[state.currentUserId];
                return {
                    users: {
                        ...state.users,
                        [state.currentUserId]: {
                            ...currentUser,
                            vehicles: currentUser.vehicles.filter(v => v._id !== vehicleId)
                        }
                    }
                };
            }),
            addRefuelingRecord: (vehicleId, record) => set((state) => {
                if (!state.currentUserId) return state;
                const currentUser = state.users[state.currentUserId];
                const newRecord = { ...record, id: Date.now().toString() };
                return {
                    users: {
                        ...state.users,
                        [state.currentUserId]: {
                            ...currentUser,
                            vehicles: currentUser.vehicles.map(v =>
                                v._id == vehicleId
                                    ? { ...v, refuelingRecords: [...v.refuelingRecords, newRecord] }
                                    : v
                            )
                        }
                    }
                };
            }),
            editRefuelingRecord: (vehicleId, recordId, updates) => set((state) => {
                if (!state.currentUserId) return state;
                const currentUser = state.users[state.currentUserId];
                return {
                    users: {
                        ...state.users,
                        [state.currentUserId]: {
                            ...currentUser,
                            vehicles: currentUser.vehicles.map(v =>
                                v._id == vehicleId
                                    ? {
                                        ...v,
                                        refuelingRecords: v.refuelingRecords.map(r =>
                                            r._id == recordId ? { ...r, ...updates } : r
                                        )
                                    }
                                    : v
                            )
                        }
                    }
                };
            }),
            deleteRefuelingRecord: (vehicleId, recordId) => set((state) => {
                if (!state.currentUserId) {
                    return state;
                }
                const currentUser = state.users[state.currentUserId];
                return {
                    users: {
                        ...state.users,
                        [state.currentUserId]: {
                            ...currentUser,
                            vehicles: currentUser.vehicles.map(v =>
                                v._id == vehicleId
                                    ? {
                                        ...v,
                                        refuelingRecords: v.refuelingRecords.filter(r => r._id !== recordId)
                                    }
                                    : v
                            )
                        }
                    }
                };
            }),
            getVehicleInsights: (vehicleId) => {
                const state = get();
                if (!state.currentUserId) return { avgFuelConsumption: 0, lastFuelConsumption: 0, monthlyExpenses: {} };
                const vehicle = state.users[state.currentUserId].vehicles.find(v => v._id === vehicleId);
                if (!vehicle) return { avgFuelConsumption: 0, lastFuelConsumption: 0, monthlyExpenses: {} };

                const records = vehicle.refuelingRecords;
                const totalDistance = records.reduce((sum, r) => sum + (r.odometerEnd - r.odometerStart), 0);
                const totalFuel = records.reduce((sum, r) => sum + r.fuelConsumed, 0);
                const avgFuelConsumption = totalDistance / totalFuel;
                const lastRecord = records[records.length - 1];
                const lastFuelConsumption = lastRecord
                    ? (lastRecord.odometerEnd - lastRecord.odometerStart) / lastRecord.fuelConsumed
                    : 0;

                const monthlyExpenses: { [month: string]: number } = {};
                records.forEach(r => {
                    const month = r.date.slice(0, 7); // YYYY-MM
                    monthlyExpenses[month] = (monthlyExpenses[month] || 0) + (r.fuelConsumed * r.fuelPrice);
                });

                return { avgFuelConsumption, lastFuelConsumption, monthlyExpenses };
            },
        }),
        {
            name: 'vehicle-refueling-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useStore;