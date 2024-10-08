import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from './button'
import { secondaryColor } from '@/constants/colors'

interface IProps {
    onSaveHandler: () => void
    onCancelHandler: () => void
}

const ActionButtons = ({
    onSaveHandler, onCancelHandler
}: IProps) => {
    return (
        <View style={styles.footer}>
            <Button
                onPress={onCancelHandler}
                title={'Cancel'}
                style={{
                    backgroundColor: '#fff',
                    borderColor: secondaryColor,
                    borderRadius: 8,
                    borderWidth: 1,
                    flex: 1
                }}
                textStyle={{
                    color: secondaryColor
                }}
            />
            <Button
                onPress={onSaveHandler}
                title={'Add'}
                style={{
                    backgroundColor: secondaryColor,
                    flex: 1
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 20
    }
})
export default ActionButtons