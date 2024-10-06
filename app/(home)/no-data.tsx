import { StyleSheet, View } from 'react-native'
import React from 'react'
import EmptyRoad from '@/components/svg/empty-road'
import MileageTrackerTransparentIcon from '@/components/svg/mileage-tracker-transparent'
import useStore, { IUserProfile } from '@/store/store'
import { ThemedText } from '@/components/themed-text'
import { secondaryColor, themeColor } from '@/constants/colors'
import { Button } from '@/components/button'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

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

    const ActivitySection = () => {
        const router = useRouter();
        const onClickHandler = () => {
            router.push('')
        }

        return (
            <View style={styles.activityContainer}>
                <EmptyRoad/>
                <ThemedText
                type='subtitle'
                style={{
                    fontFamily: 'SourceSansPro-Light',
                    textAlign: 'center'
                }}>
                    Add a vehicle to start tracking its fuelling & performance
                </ThemedText>
                <Button 
                style={{
                    backgroundColor: secondaryColor,
                    flexDirection: 'row',
                    gap: 10
                }}
                title={'Add Vehicle'}
                onPress={onClickHandler} 
                rightContent={
                    <AntDesign name="arrowright" size={22} color={'#fff'} />
                }
                />
            </View>
        )
    }

    return (
        <View style={styles.outerContainer}>
            <WelcomingSection {...user}/>
            <ActivitySection/>
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