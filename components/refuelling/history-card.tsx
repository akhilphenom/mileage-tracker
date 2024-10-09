import { IRefuelingRecord } from "@/store/store";
import { useRouter } from "expo-router";
import moment from "moment";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import RefuelIcon from "../svg/refuel";
import { shadow } from "@/constants/styles";

const HistoryCard = ({
    date, fuelConsumed, fuelPrice
}: IRefuelingRecord) => {
    const router = useRouter();
    const formattedDate = moment(date).format("ddd, DD MMM 'YY");
    
    const onPressHandler = () => {
        router.push('(refuelling-record)');
        router.setParams({ mode: 'edit' })
    }

    return (
        <TouchableOpacity style={styles.historyCard} onPress={onPressHandler}>
            <View style={styles.row}>
                <RefuelIcon height={30} width={30} style={{ marginLeft: 10 }}/>
                <View style={styles.column}>
                    <ThemedText>{formattedDate}</ThemedText>
                    <ThemedText>{fuelConsumed} L</ThemedText>
                </View>
                <View style={{ marginRight: 10 }}>
                    <ThemedText>+$ {fuelPrice}</ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    flatList: {
        gap: 14
    },
    historyCard: {
        ...shadow,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15
    },
    column: {
        flexDirection: 'column',
        gap: 6,
        flex: 1,
        alignItems: 'flex-start',
    }
})


export default HistoryCard