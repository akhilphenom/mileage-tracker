import useStore, { IVehicle } from "@/store/store";

export const useVehicleCreation = () => {
    const {
        vehicleCreation,
        startVehicleCreation,
        updateVehicleCreation,
        completeVehicleCreation,
        cancelVehicleCreation,
        setSelectedVehicle
    } = useStore();

    const handleStartVehicleCreation = () => {
        setSelectedVehicle(null);
        startVehicleCreation();
    };

    const handleUpdateVehicle = (updates: Partial<IVehicle>) => {
        updateVehicleCreation(updates);
    };

    const handleCompleteVehicleCreation = () => {
        if (!vehicleCreation || !vehicleCreation.name || !vehicleCreation.type || vehicleCreation.engineCC! <= 0) {
            // console.log('Please fill all required fields correctly');
            return;
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