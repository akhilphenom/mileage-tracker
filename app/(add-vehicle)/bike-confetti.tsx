import React, { useEffect } from 'react'
import ComposedSafeView from '../../components/safe-view-composed';
import { ThemedText } from '../../components/themed-text';
import Confetti from '../../components/confetti'
import { useVehicleCreation } from '../../hooks/use-vehicle-creation.hook'

const BikeConfetti = () => {
    const { handleCompleteVehicleCreation, handleCancelVehicleCreation } = useVehicleCreation()
    useEffect(() => {
        handleCompleteVehicleCreation();
        return () => handleCancelVehicleCreation();
    }, [])
    return (
        <ComposedSafeView>
            <ThemedText>Hey</ThemedText>
            <Confetti/>
        </ComposedSafeView>
    )
}

export default BikeConfetti