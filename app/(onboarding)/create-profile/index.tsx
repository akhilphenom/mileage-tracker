import { Button } from '@/components/button';
import Header from '@/components/header';
import ComposedSafeView from '@/components/safe-view-composed';
import TextInput from '@/components/text-input';
import { ThemedText as Text } from '@/components/themed-text';
import { themeColor } from '@/constants/colors';
import { useOnboarding } from '@/hooks/use-onboarding';
import { validators } from '@/utils/helpers';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

type Error = {
    name: string,
    nickname: string,
    email: string
}

export default function CreateAccount() {
    const router = useRouter();
    const { handleCancelOnboarding, handleStartOnboarding, handleUpdateOnboardingUser } = useOnboarding();
    const { validateName, validateEmail } = validators();

    const name = useRef('')
    const nickname = useRef('')
    const email = useRef('')

    const [errors, setErrors] = useState<Error>({ name: '', nickname: '', email: '' });

    const backHandler = useCallback(() => {
        handleCancelOnboarding()
        router.back();
    }, [])

    const validate = () => {
        const newErrors: Error = {
            name: '',
            nickname: '',
            email: ''
        };

        const nameValidation = validateName(name.current)
        const nicknameValidation = validateName(nickname.current)
        const emailValidation = validateEmail(email.current)

        !nameValidation && (newErrors.name = 'You cannot include symbols or numbers in Name');
        !nicknameValidation && (newErrors.nickname = 'You cannot include symbols or numbers in Nick Name');
        !emailValidation && (newErrors.email = 'Invalid Email');

        setErrors(newErrors);

        return nameValidation && nicknameValidation && emailValidation;
    };

    const Form = () => (
        <View style={{
            margin: 20,
        }}>
            <Text type='subtitle'>Create Account</Text>
            <TextInput
                placeholder="Name *"
                onChangeText={e => name.current = e}
                style={styles.input}
                showWarning={!!errors['name'].length}
            />
            {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

            <TextInput
                placeholder="Nickname"
                onChangeText={e => nickname.current = e}
                style={styles.input}
                showWarning={!!errors['nickname'].length}
            />
            {errors.nickname ? <Text style={styles.error}>{errors.nickname}</Text> : null}

            <TextInput
                placeholder="Email *"
                onChangeText={e => email.current = e}
                style={styles.input}
                showWarning={!!errors['email'].length}
            />
            {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
        </View>
    )

    const Footer = memo(() => {
        const [isChecked, setIsChecked] = useState(false);

        const onSubmit = () => {
            // router.push('create-profile/set-pass-code')////
            // return ////
            if (validate()) {
                handleUpdateOnboardingUser({
                    name: name.current,
                    nickname: nickname.current,
                    email: email.current
                })
                router.push('create-profile/set-pass-code')
            }
        };

        return (
            <View style={styles.footer}>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? themeColor : undefined}
                    />
                    <Text style={styles.checkboxLabel}>
                        Tick this box to confirm you are at least 18 years old and agree to our terms & conditions
                    </Text>
                </View>

                <Button 
                title={'Continue'} 
                onPress={onSubmit} 
                disabled={false && !isChecked} ////
                />
            </View>
        )
    })

    useEffect(() => {
        handleStartOnboarding();
    }, [])

    return (
        <ComposedSafeView header={
            <Header backHandler={backHandler}/>
        }>
            <KeyboardAvoidingView style={styles.container}>
                <Form />
                <View style={{ flex: 1 }} />
                <Footer />
            </KeyboardAvoidingView>
        </ComposedSafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    input: { borderBottomWidth: 1, marginVertical: 10, padding: 8 },
    error: { color: 'red', fontSize: 14 },
    checkbox: {
        marginTop: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        margin: 10
    },
    checkboxLabel: { marginLeft: 8 },
});
