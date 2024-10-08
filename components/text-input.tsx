import { View, TextInput as Input, useColorScheme, StyleSheet, TextInputProps, ViewStyle } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/use-theme-color.hook';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
    placeholder: string;
    value?: string;
    onChangeText: (text: string) => void;
    style?: any;
    containerStyle?: ViewStyle,
    showWarning: boolean,
    textInputProps?: TextInputProps,
}

const TextInput = ({
    placeholder, value, onChangeText, style, showWarning, textInputProps, containerStyle
}: IProps) => {
    const colorScheme = useColorScheme();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    return (
        <View style={[
            styles.wrapper,
            { backgroundColor },
            containerStyle
        ]}>
            <Input
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={{
                    flex: 1,
                    borderColor: 'transparent',
                    outlineStyle: 'none',
                    textColor,
                    fontSize: 18,
                    ...style,
                }}
                {...textInputProps}
            />
            {
                showWarning ? 
                    <View style={{
                        paddingHorizontal: 10
                    }}>
                        <Ionicons
                            name={colorScheme != 'light' ? "warning-outline" : "warning"}
                            color={"red"}
                            size={20}
                        />
                    </View>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    }
})

export default TextInput