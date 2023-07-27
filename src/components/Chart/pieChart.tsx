import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

interface ChartData {
    labels: string[];
    values: number[];
}

interface PieChartProps {
    data: ChartData;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: "book category",
                data: data.values,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
            },
        ],
    };

    const options = {
        responsive: true,
    };

    return (
        <div style={{ width: "550px", height: "400px" }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
