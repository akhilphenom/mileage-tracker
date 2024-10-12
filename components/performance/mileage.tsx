import { ChartData, useSeries } from "@/hooks/use-create-continuous-dates";
import useStore from "@/store/store";
import { ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface IProps {
    width: number,
    height: number
}

const VehicleMileagePerformance = ({
    width, height
}: IProps) => {
    const { currentSelectedVehicle, getVehicleInsights } = useStore()
    const { monthlyMileage } = getVehicleInsights(currentSelectedVehicle!)
    const data: ChartData = useSeries(monthlyMileage)

    const chartWidth = Math.max(width, data.labels.length * 50)
    return <></>
    return (
        <ScrollView horizontal={true} style={{
            maxHeight: height, maxWidth: width
        }} showsHorizontalScrollIndicator={false}>
            <LineChart
                data={data}
                width={chartWidth}
                height={height}
                yAxisLabel=""
                yAxisSuffix=" km/l"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                // fromZero={true}
                // withInnerLines={false}
            />
        </ScrollView>
    );
};

export default VehicleMileagePerformance