import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { secondaryColor } from '@/constants/colors'
import { useRouter } from 'expo-router'

interface IProps {
    showBackIcon?: boolean
    backHandler?: () => void,
    iconColor?: string
}

const Header = ({
    showBackIcon = true,
    backHandler,
    iconColor = secondaryColor
}: IProps) => {
    const router = useRouter();
    const onPress = () => {
        backHandler ? backHandler() : router.back()
    }

    return (
        <View style={{
            paddingHorizontal: 10,
            paddingVertical: 15,
        }}>
            {
                showBackIcon?
                <TouchableOpacity onPress={onPress}>
                    <Ionicons name='arrow-back' size={24} color={iconColor}/>
                </TouchableOpacity> : null
            }
            <View style={{flex: 1}}></View>
            
        </View>
    )
}

export default Header