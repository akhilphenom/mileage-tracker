import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Entypo } from '@expo/vector-icons';
import { forwardRef, useImperativeHandle } from 'react';

export interface ImagePickerRef {
    getImageBase64: () => string | null;
}

const ImagePickerComponent = forwardRef<ImagePickerRef, {}>((props, ref) => {
    const [previewUri, setPreviewUri] = useState<string | undefined>(undefined);
    const [imageBase64, setImageBase64] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        getImageBase64: () => imageBase64
    }));

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ crop: { originX: 0, originY: 0, width: 1000, height: 1000 } }],
                { format: 'png' as unknown as any, base64: true }
            );
            setPreviewUri(manipulatedImage.uri!);
            setImageBase64(manipulatedImage.base64 || null);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.circle} onPress={pickImage}>
                {
                    previewUri ?
                        <ImageBackground imageStyle={{
                            borderRadius: 75,
                            ...styles.preview
                        }}
                            style={styles.preview}
                            source={{ uri: previewUri }}
                        /> :
                        <Entypo name="camera" size={24} color={'#fff'} />
                }
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    circle: {
        borderRadius: 75,
        width: 150,
        height: 150,
        backgroundColor: '#45A9BF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: 150,
        height: 150,
    },
});

export default ImagePickerComponent;