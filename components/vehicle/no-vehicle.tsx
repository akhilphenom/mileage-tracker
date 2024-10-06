import { View, StyleSheet } from 'react-native'
import React from 'react'
import EmptyRoad from '../svg/empty-road'
import { Button } from '../button'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { ThemedText } from '../themed-text'
import { secondaryColor } from '../../constants/colors'

const NoVehicles = () => {
    const router = useRouter();
    const onClickHandler = () => {
        router.push('(add-vehicle)')
    }

    return (
        <View style={styles.activityContainer}>
            <EmptyRoad />
            <ThemedText
                type='subtitle'
                style={{
                    fontFamily: 'SourceSansPro-Light',
                    textAlign: 'center'
                }}>
                Add a vehicle to start tracking its fuelling & performance
            </ThemedText>
            <Button
                style={{
                    backgroundColor: secondaryColor,
                    flexDirection: 'row',
                    gap: 10
                }}
                title={'Add Vehicle'}
                onPress={onClickHandler}
                rightContent={
                    <AntDesign name="arrowright" size={22} color={'#fff'} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    welcomeContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10
    },
    activityContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    }
})

export default NoVehicles