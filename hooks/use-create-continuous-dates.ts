import { Expenses } from "@/components/performance/expenses";
import moment from "moment";

export const useSeriesForExpenses = (monthlyExpenses: { [key: string]: number }) => {
    const createContinuousMonthSeries = (startDate: string, endDate: string) => {
        let current = moment(startDate).startOf('month');
        const end = moment(endDate).endOf('month');
        const result: { [key: string]: number } = {};

        while (current.isSameOrBefore(end)) {
            result[current.format('YYYY-MM')] = 0;
            current.add(1, 'month');
        }

        return result;
    };

    const dates = Object.keys(monthlyExpenses);
    const startDate = moment.min(dates.map(date => moment(date))).format('YYYY-MM');
    const endDate = moment.max(dates.map(date => moment(date))).format('YYYY-MM');

    const continuousData: { [key: string]: number } = {
        ...createContinuousMonthSeries(startDate, endDate),
        ...monthlyExpenses
    };

    const orderedChartData: Expenses = {
        labels: [],
        datasets: [{ data: [] }]
    };

    Object.keys(continuousData)
        .sort((a, b) => moment(a).diff(moment(b)))
        .forEach(key => {
            orderedChartData.labels.push(moment(key).format('MMM YY'));
            orderedChartData.datasets[0].data.push(continuousData[key]);
        });

    return orderedChartData
}