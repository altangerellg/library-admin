import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
    labels: string[];
    values: number[];
}

interface ChartComponentProps {
    data: ChartData;
    data1: ChartData;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, data1 }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: "Бүртгүүлсэн хэрэглэгч",
                data: data.values,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };
    const chartData1 = {
        labels: data1.labels,
        datasets: [
            {
                label: "Ун ном",
                data: data1.values,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "550px", height: "400px", marginRight: "50px" }}>
                <Bar data={chartData} options={options} />
            </div>
            <div style={{ width: "550px", height: "400px", marginLeft: "50px" }}>
                <Bar data={chartData1} options={options} />
            </div>
        </div>
    );
};

export default ChartComponent;
