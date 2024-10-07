import { Button } from '@/components/button';
import Header from '@/components/header';
import ComposedSafeView from '@/components/safe-view-composed';
import TextInput from '@/components/text-input';
import { ThemedText as Text } from '@/components/themed-text';
import { themeColor } from '@/constants/colors';
import { useOnboarding } from '@/hooks/use-onboarding.hook';
import { validators } from '@/utils/helpers';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

type FormValues = {
    name: string,
    nickname: string,
    email: string
}

type Error = FormValues
interface FooterRef {
    getCheckboxValue: () => boolean;
}
interface FormRef {
    getFormValues: () => FormValues;
}

export default function CreateAccount() {
    const router = useRouter();
    const { handleCancelOnboarding, handleStartOnboarding, handleUpdateOnboardingUser } = useOnboarding();
    const { validateName, validateEmail } = validators();

    const name = useRef('')
    const nickname = useRef('')
    const email = useRef('')

    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        nickname: '',
        email: ''
    })

    const formRef = useRef<FormRef>();
    const footerRef = useRef<FooterRef>();

    const [errors, setErrors] = useState<Error>({ name: '', nickname: '', email: '' });
    const [isChecked, setIsChecked] = useState(false);

    const backHandler = useCallback(() => {
        handleCancelOnboarding()
        router.back();
    }, [])

    const validate = () => {
        const values: FormValues = formRef.current?.getFormValues()!
        const newErrors: Error = {
            name: '',
            nickname: '',
            email: ''
        };

        name.current = values.name
        nickname.current = values.nickname
        email.current = values.email
        
        const nameValidation = validateName(name.current)
        const nicknameValidation = nickname.current.trim().length ? validateName(nickname.current) : true
        const emailValidation = validateEmail(email.current)

        !nameValidation && (
            newErrors.name = name.current.trim().length ? 
                            'You cannot include symbols or numbers in Name' :
                            'Name cannot be empty'
        );
        !nicknameValidation && (newErrors.nickname = 'You cannot include symbols or numbers in Nick Name');
        !emailValidation && (newErrors.email = 'Invalid Email');

        setErrors(newErrors);
        setFormValues({
            name: name.current,
            nickname: nickname.current,
            email: email.current
        })
        setIsChecked(footerRef.current?.getCheckboxValue()!)

        return nameValidation && nicknameValidation && emailValidation;
    };

    const Form = forwardRef(({ formValues, errors }: { formValues: FormValues, errors: FormValues }, ref) => {
        const [name, setName] = useState(formValues.name);
        const [nickname, setNickname] = useState(formValues.nickname);
        const [email, setEmail] = useState(formValues.email);
        
        useImperativeHandle(ref, () => ({
            getFormValues: () => ({ name, nickname, email })
        }))

        return (
            <View style={styles.form}>
                <Text type='subtitle'>Create Account</Text>
                <View>
                    <TextInput
                        placeholder="Name *"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        showWarning={!!errors['name'].length}
                    />
                    {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
                </View>
    
                <View>
                    <TextInput
                        placeholder="Nickname"
                        value={nickname}
                        onChangeText={setNickname}
                        style={styles.input}
                        showWarning={!!errors['nickname'].length}
                    />
                    {errors.nickname ? <Text style={styles.error}>{errors.nickname}</Text> : null}
                </View>
    
                <View>
                    <TextInput
                        placeholder="Email *"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        showWarning={!!errors['email'].length}
                    />
                    {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                </View>
            </View>
        )
    })

    const Footer = forwardRef(({ checked }: { checked: boolean }, ref) => {
        const [isChecked, setIsChecked] = useState(checked);

        useImperativeHandle(ref, () => ({
            getCheckboxValue: () => isChecked
        }))

        const onSubmit = () => {
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
                <Form ref={formRef} formValues={formValues} errors={errors}/>
                <View style={{ flex: 1 }} />
                <Footer ref={footerRef} checked={isChecked}/>
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
    form: {
        margin: 20,
        gap: 40
    }
});
