import { useSeriesForExpenses } from "@/hooks/use-create-continuous-dates";
import useStore from "@/store/store";
import moment from "moment";
import { BarChart } from "react-native-chart-kit";

interface IProps {
    width: number,
    height: number
}

export type Expenses = {
    labels: string[],
    datasets: { data: number[] }[]
};

const Expenses = ({
    width, height
}: IProps) => {
    const { currentSelectedVehicle, getVehicleInsights } = useStore()
    const { monthlyExpenses } = getVehicleInsights(currentSelectedVehicle!)

    const data: Expenses = useSeriesForExpenses(monthlyExpenses)

    const sortedKeys = Object.keys(monthlyExpenses).sort((a, b) => moment(a).diff(moment(b)));

    for(const key of sortedKeys) {
        data.labels.push(moment(key).format('MMM'));
        data.datasets[0].data.push(monthlyExpenses[key]);
    }

    return (
        <BarChart
            data={data}
            width={width}
            height={height}
            yAxisLabel=""
            yAxisSuffix="k"
            chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                style: {
                    borderRadius: 16
                }
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />
    );
};

export default Expenses;