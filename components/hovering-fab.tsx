import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { secondaryColor } from '@/constants/colors'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

interface IProps {
    containerStyle?: ViewStyle,
    iconStyle?: IconProps<any>,
    onPressHandler: () => void
}

const HoveringFab = ({
    onPressHandler, containerStyle = {}, iconStyle = {
        size: 24, 
        name: "plus", 
        color: '#fff' 
    }
}: IProps) => {
    return (
        <TouchableOpacity style={[
            styles.circle,
            styles.position,
            containerStyle
        ]}
        onPress={onPressHandler}
        >
            <Entypo name="plus" size={24} style={iconStyle}/>
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

export default HoveringFab