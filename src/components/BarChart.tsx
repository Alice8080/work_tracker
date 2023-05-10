import { FC } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { RecordsList } from '../api/apiSlice';
import { formData, getNameByDate } from './formData';

interface Props {
    recordsList: RecordsList;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ recordsList }: Props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return getNameByDate(recordsList, context.label);
                    }
                }
            }
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false
                },
                border: {
                    color: theme.palette.text.disabled,
                    dash: [2, 4],
                },
                ticks: { 
                    color: theme.palette.text.disabled 
                }
            },
            y: {
                grid: {
                    color: "#4a4a4a40",
                },
                border: {
                    color: theme.palette.text.disabled,
                    dash: [5, 2],
                },
                ticks: { 
                    display: true, 
                    color: theme.palette.text.disabled 
                }
            }
        },
        maintainAspectRatio: true,
    };

    let { labels, data } = formData(recordsList);

    const chartData: ChartData<'bar'> = {
        labels,
        datasets: [{
            label: 'My First Dataset',
            data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };
    return (
        <Bar options={options} data={chartData} />
    );
}

export default BarChart;