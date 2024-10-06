import React, { useCallback } from 'react'
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import { ViewStyle } from 'react-native';

interface IProps {
    children: React.ReactNode
    style?: ViewStyle
}

const ToggleDrawer = ({
    children, style = {}
}: IProps) => {
    const navigation = useNavigation()
    const onClickHandler = useCallback(() => {
        navigation.dispatch(DrawerActions.toggleDrawer())
    }, [])

    return (
        <TouchableOpacity onPress={onClickHandler} style={{
            ...style
        }}>
            {children}
        </TouchableOpacity>
    )
}

export default ToggleDrawer