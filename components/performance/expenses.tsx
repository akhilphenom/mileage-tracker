import React from 'react';
import { ScrollView } from 'react-native';
import { ChartData, useSeries } from "@/hooks/use-create-continuous-dates";
import useStore from "@/store/store";
import { BarChart } from "react-native-chart-kit";

interface IProps {
    width: number,
    height: number
}

const Expenses = ({ width, height }: IProps) => {
    const { currentSelectedVehicle, getVehicleInsights } = useStore()
    const { monthlyExpenses } = getVehicleInsights(currentSelectedVehicle!)

    const data: ChartData = useSeries(monthlyExpenses)
    const chartWidth = Math.max(width, data.labels.length * 50);
    console.log(data)

    return (
        <ScrollView horizontal={true} style={{ 
            maxHeight: height, maxWidth: width
        }} showsHorizontalScrollIndicator={false}>
            <BarChart
                data={data}
                width={chartWidth}
                height={height}
                yAxisLabel=""
                yAxisSuffix="k"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    barPercentage: 0.5,
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                showValuesOnTopOfBars={true}
                fromZero={true}
                withInnerLines={false}
            />
        </ScrollView>
    );
};

export default Expenses;