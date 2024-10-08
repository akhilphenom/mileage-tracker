import { ImageBackground, View, StyleSheet } from 'react-native'
import React from 'react'
import { IVehicle } from '../../store/store'
import { ThemedText } from '../themed-text'
import { shadow } from '@/constants/styles'

const VehicleCardItem = ({
    name, engineCC, imageUrl, type
}: IVehicle) => {
    return (
        <View style={[
            styles.tile,
            styles.shadow
        ]}>
            { imageUrl ? 
                <ImageBackground 
                source={{uri: `data:image/jpeg;base64,${imageUrl}`}} 
                style={{ height: 200 }}
                imageStyle={{
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8
                }}
                /> :
                <View style={{
                    backgroundColor: 'yellow'
                }}/>
            }
            <View style={styles.footer}>
                <View>
                    <ThemedText type='subtitle'>{name}</ThemedText>
                    <ThemedText>{type}</ThemedText>
                </View>
                <View>
                    <ThemedText type={'regularItalic'} style={{fontSize: 22}}>
                        {engineCC} cc
                    </ThemedText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tile: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 10,
        paddingBottom: 10
    },
    footer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    shadow
})

export default VehicleCardItem