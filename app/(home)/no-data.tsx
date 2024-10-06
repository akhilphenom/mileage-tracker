import { StyleSheet, View } from 'react-native'
import React from 'react'
import MileageTrackerTransparentIcon from '@/components/svg/mileage-tracker-transparent'
import useStore, { IUserProfile } from '@/store/store'
import { ThemedText } from '@/components/themed-text'
import { themeColor } from '@/constants/colors'
import NoVehicles from '../../components/vehicle/no-vehicle'

export default function NoData () {
    const { currentUserId, users } = useStore();
    const user = users[currentUserId!];

    const WelcomingSection = ({
        name
    }: Partial<IUserProfile>) => {
        return (
            <View style={styles.welcomeContainer}>
                <MileageTrackerTransparentIcon height={50} width={50}/>
                <ThemedText 
                type='title'
                style={{
                    fontFamily: 'SourceSansPro-Light',
                    color: themeColor,
                }}
                >
                    {`Hi ${name}`}
                </ThemedText>
                <ThemedText 
                type='subtitle'
                style={{
                    fontFamily: 'SourceSansPro-Light',
                    textAlign: 'center'
                }}>
                    Track your miles towards a prosperous financial journey!
                </ThemedText>
            </View>
        )
    }

    return (
        <View style={styles.outerContainer}>
            <WelcomingSection {...user}/>
            <NoVehicles/>
            <View style={{ flex: 1 }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    welcomeContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10
    },
    activityContainer: { 
        flex: 1,
        alignItems: 'center',
        gap: 15
    }
})