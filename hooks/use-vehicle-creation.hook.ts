import useStore, { IVehicle } from "@/store/store";

export const useVehicleCreation = () => {
    const {
        vehicleCreation,
        startVehicleCreation,
        updateVehicleCreation,
        completeVehicleCreation,
        cancelVehicleCreation,
    } = useStore();

    const handleStartVehicleCreation = () => {
        startVehicleCreation();
    };

    const handleUpdateVehicle = (updates: Partial<IVehicle>) => {
        updateVehicleCreation(updates);
    };

    const handleCompleteVehicleCreation = () => {
        if (!vehicleCreation || !vehicleCreation.name || !vehicleCreation.type || vehicleCreation.engineCC! <= 0) {
            throw new Error('Please fill all required fields correctly');
        }
        completeVehicleCreation();
    };

    const handleCancelVehicleCreation = () => {
        cancelVehicleCreation();
    };

    return {
        vehicleCreation,
        handleStartVehicleCreation,
        handleUpdateVehicle,
        handleCompleteVehicleCreation,
        handleCancelVehicleCreation,
    };
};