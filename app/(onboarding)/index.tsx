import { Button } from "@/components/button";
import LinearGradientBackground from "@/components/linear-gradient";
import SafeView from "@/components/safe-view";
import Arc from "@/components/svg/arc";
import { MileageTrackerIcon } from "@/components/svg/mileage-tracker";
import { ThemedText } from "@/components/themed-text";
import { themeColor } from "@/constants/colors";
import { router } from "expo-router";
import { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default function FirstTime() {
    const { width, height } = Dimensions.get('window');

    const ActivitySection = () => {

        const onClickHandler = () => {
            router.push('/create-profile')
        }

        return (
            <View style={styles.actvitySection}>
                <View style={{
                    paddingVertical: 20,
                }}>
                    <MileageTrackerIcon/>
                    <ThemedText type="subtitle" style={{
                        textAlign: 'center',
                        paddingVertical: 10,
                        color: themeColor
                    }}>
                        Mileage Tracker
                    </ThemedText>
                </View>
                <ThemedText type={'light'} style={{
                    textAlign: 'center',
                    fontSize: 23
                }}>
                    Create an account to get started!
                </ThemedText>
                <Button 
                title={"Sign Up"}
                onPress={onClickHandler} 
                style={styles.button}
                />
            </View>
        )
    }

    const ArcComposition = useMemo(() => (
        <View style={{ flex: 1 }}>
            <View style={{
                position: 'absolute',
                bottom: 0,
            }}>
                <Arc width={width} height={width}/>
            </View>
            <ThemedText type="title" style={styles.heroText}>
                Track your miles towards a prosperous financial journey!
            </ThemedText>
        </View>
    ), [width, height])

    return (
        <>
            <LinearGradientBackground />
            <SafeView>
                <ActivitySection />
                {ArcComposition}
            </SafeView>
        </>
    )
}

const styles = StyleSheet.create({
    actvitySection: {
        flex: 1,
        paddingHorizontal: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    heroText: {
        paddingHorizontal: 40,
        fontSize: 25,
        fontFamily: 'SourceSansPro-Light',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 50
    },
    button: {
        width: '100%',
    }
})