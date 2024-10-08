import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { IRefuelingRecord } from '@/store/store'
import HistoryCard from './history-card'

interface IProps {
    refuellingRecords: IRefuelingRecord[]
}

const RefuellingHistory = ({
    refuellingRecords
}: IProps) => {

    return (
        <View style={{ flex: 1 }}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={refuellingRecords}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
                <HistoryCard {...item}/>
            )}
            contentContainerStyle={styles.flatList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        gap: 14
    },
})

export default RefuellingHistory