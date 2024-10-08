import React, { useEffect, useState } from 'react'
import ComposedSafeView from '../../components/safe-view-composed';
import { ThemedText } from '../../components/themed-text';
import Confetti from '../../components/confetti'
import { useVehicleCreation } from '../../hooks/use-vehicle-creation.hook'
import { BackHandler, Dimensions, Image, StyleSheet, View } from 'react-native';
import Arc from '@/components/svg/arc';
import useStore, { IVehicle } from '@/store/store';
import { ImageBackground } from 'expo-image';
import BikePlaceholderImage from '../../assets/images/bike-placeholder.png';
import CarPlaceholderImage from '../../assets/images/car-placeholder.png';
import Header from '@/components/header';
import { useRouter } from 'expo-router';

const BIKE_PLACEHOLDER_IMAGE = Image.resolveAssetSource(BikePlaceholderImage).uri;
const CAR_PLACEHOLDER_IMAGE = Image.resolveAssetSource(CarPlaceholderImage).uri;

const BikeConfetti = () => {
    const { handleCompleteVehicleCreation, handleCancelVehicleCreation } = useVehicleCreation()
    const { currentSelectedVehicle, users, currentUserId } = useStore();
    const router = useRouter();

    const { width, height } = Dimensions.get('window');
    
    const [currentVehicle, setCurrentVehicle] = useState<IVehicle | null>(null);

    const onBackClickHandler = () => {
        router.navigate('/(drawer)/(tabs)/vehicles')
    }

    useEffect(() => {
        if(currentSelectedVehicle) {
            const { vehicles } = users[currentUserId!];
            const index = vehicles.findIndex(({ _id }) => _id == currentSelectedVehicle)
            index>-1 && setCurrentVehicle(vehicles[index])
        }
    }, [currentSelectedVehicle])
    
    useEffect(() => {
        handleCompleteVehicleCreation();
        BackHandler.addEventListener('hardwareBackPress', () => {
            onBackClickHandler()
            return true;
        })
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => true)
            handleCancelVehicleCreation();
        }
    }, [])

    return (
        <ComposedSafeView>
            <Header backHandler={onBackClickHandler}/>
            <View style={{
                flex: 1,
                maxHeight: 500
            }}>
                <Confetti/>
            </View>
            <View style={[
                styles.imageContainer,
            ]}>
                {
                    currentVehicle ?
                    <View style={{
                        alignItems: 'center'
                    }}>
                        { currentVehicle.imageUrl ? 
                            <ImageBackground 
                            source={{uri: `data:image/jpeg;base64,${currentVehicle.imageUrl}`}} 
                            style={styles.circle}
                            imageStyle={styles.circle}
                            /> :
                            <Image 
                            source={{ 
                                uri: currentVehicle.type == '2-wheeler' ? 
                                    BIKE_PLACEHOLDER_IMAGE : CAR_PLACEHOLDER_IMAGE
                            }} 
                            style={styles.circle}
                            /> 
                        }
                        <View style={styles.vehicleDetails}>
                            <ThemedText type='subtitle'>{currentVehicle.name}</ThemedText>
                            <ThemedText type='title'>Vehicle Added!</ThemedText>
                        </View>
                    </View>
                    :
                    null
                }
            </View>
            <View style={{
                position: 'absolute',
                bottom: -height/9,
            }}>
                <Arc width={width} height={width}/>
            </View>
        </ComposedSafeView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        position: 'absolute',
        top: 100,
        width: '100%',
        borderRadius: 50,
        justifyContent: 'center',
    },
    circle: { 
        height: 200,
        width: 200,
        borderRadius: 100
    },
    vehicleDetails: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 20,
        flexDirection: 'column',
        alignItems: 'center'
    }
})

export default BikeConfetti