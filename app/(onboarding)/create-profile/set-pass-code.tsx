import { useRef } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import ComposedSafeView from "@/components/safe-view-composed";
import { useRouter } from "expo-router";
import Header from "@/components/header";
import { PassCode, PassCodeRef } from "@/components/pass-code";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/button";
import { secondaryColor } from "@/constants/colors";

export default function SetPass() {
    const router = useRouter();
    const firstRef = useRef<PassCodeRef>(null);
    const secondRef = useRef<PassCodeRef>(null);
    const onSkip = () => {

    }

    const onSubmit = () => {
        router.navigate('/')////
        return;
        const firstCode = firstRef.current?.getCodes().join("");
        const secondCode = secondRef.current?.getCodes().join("");
        if(firstCode==secondCode) {
            router.navigate('/')
        } else {

        }
    }

    return (
        <ComposedSafeView header={
            <Header/>
        }>
            <KeyboardAvoidingView style={{flex: 1, marginBottom: 10}}>
                <View style={styles.topContainer}>
                    <ThemedText type='subtitle' style={{ fontSize: 25 }}>
                        Set a Pass Code
                    </ThemedText>
                    <View style={{
                        marginVertical: 20
                    }}>
                        <ThemedText type='subtitle' style={{ fontSize: 22 }}>
                            Enter a 4-Digit Pass Code *
                        </ThemedText>
                        <ThemedText type='light' style={{ fontSize: 22, marginVertical: 5 }}>
                            You will need to Enter at every app launch
                        </ThemedText>
                        <View style={styles.passCodeContainer}>
                            <PassCode ref={firstRef}/>
                        </View>
                    </View>
                    <View style={{
                        marginVertical: 20
                    }}>
                        <ThemedText type='light' style={{ fontSize: 22 }}>
                            Confirm Pass Code *
                        </ThemedText>
                        <View style={styles.passCodeContainer}>
                            <PassCode ref={secondRef}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}></View>
                <View style={styles.bottomContainer}>
                    <Button 
                    onPress={onSubmit} 
                    title={"Continue"}
                    textStyle={{
                        fontSize: 20
                    }}
                    />
                    <Button 
                    onPress={onSkip} 
                    title={"Skip"} 
                    textStyle={{
                        fontSize: 20
                    }}
                    style={{
                        backgroundColor: secondaryColor,
                        width:'auto'
                    }}/>
                </View>
            </KeyboardAvoidingView>
        </ComposedSafeView>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    passCodeContainer: {
        marginVertical: 20
    },
    bottomContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        gap: 10,
    },
})