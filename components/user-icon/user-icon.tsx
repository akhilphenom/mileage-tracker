import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import ToggleDrawer from '../drawer-toggle'
import { secondaryColor } from '@/constants/colors'

interface IProps {
    style?: ViewStyle
}

const UserIcon = ({
    style
}: IProps) => {
    return (
        <View style={{
            ...styles.container,
            ...style
        }}>
            <ToggleDrawer>
                <FontAwesome5 name="user" size={24} color={secondaryColor} />
            </ToggleDrawer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 20,
    }
})

export default UserIcon