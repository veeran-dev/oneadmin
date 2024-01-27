import React from 'react';
import {Chart, ArcElement, Colors} from 'chart.js'
Chart.register(ArcElement);
Chart.register(Colors);
import { Doughnut } from 'react-chartjs-2';

Chart.defaults.backgroundColor = 'green';
Chart.defaults.borderColor = 'black';
Chart.defaults.color = '#000';

interface DonutChartProps {
    percentage: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ percentage=0 }) => {
    const data = {
        datasets: [
            {
                data: [percentage, 100 - percentage],
                backgroundColor: ['#1dc14e', '#d8dbe4'],
                borderWidth: 0,
                cutout: '70%'
            },
        ],
    };

    const plugins= [{
        id: 'textCenter',
        beforeDraw: function(chart: any) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 120).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = percentage + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

            ctx.fillStyle = "#000";
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

    const options = {
        cutoutPercentage: 70,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
    };

    return <Doughnut data={data} options={options} plugins={plugins}/>;
};

export default DonutChart;
