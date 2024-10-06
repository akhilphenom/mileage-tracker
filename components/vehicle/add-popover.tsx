import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { secondaryColor } from '@/constants/colors'
import { useRouter } from 'expo-router'

const PopOver = () => {
    const router = useRouter();
    const onPressHandler = () => {
        router.push('(add-vehicle)')
    }

    return (
        <TouchableOpacity style={[
            styles.circle,
            styles.position
        ]}
        onPress={onPressHandler}
        >
            <Entypo name="plus" size={24} color={'#fff'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    circle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: secondaryColor
    },
    position: {
        position: 'absolute',
        bottom: 15,
        right: 15
    }
})

export default PopOver