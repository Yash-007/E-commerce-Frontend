import {
    Chart as ChartJS,
    Title,
    Legend,
    BarElement,
    Tooltip,
    LinearScale,
    CategoryScale,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';

import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2';

ChartJS.register(
    Title,
    Legend,
    BarElement,
    Tooltip,
    LinearScale,
    CategoryScale,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
)

const months= ["January", "February", "March", "April", "May", "June", "July"];

export const BarChart = ({
    data1= [],
    data2=[],
    title_1,
    title_2,
    bgColor_1,
    bgColor_2,
    horizontal=false,
    labels=months,
})=>{
  const options = {
    responsive : true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        }
    },

    scales: {
        y:{
            beginAtZero: true,
            grid: {
                display: false,
            }
        },
        x: {
            grid: {
                display: false,
            }
        }
    }
  };

  const data = {
    labels,
    datasets: [
        {
            label: title_1,
            data: data1,
            backgroundColor: bgColor_1,
            barThickness: "flex",
            barPercentage: 1,
            categoryPercentage: 0.4,
        },
        {
            label: title_2,
            data: data2,
            backgroundColor: bgColor_2,
            barThickness: "flex",
            barPercentage: 1,
            categoryPercentage: 0.4,
        },
    ]
  };

  return <Bar options={options} data={data} />
}


export const PieChart = ({
    labels,
    data,
    backgroundColor,
    offset
})=>{
    const options = {
        responsive: true,
        plugins: {
            legend:{
                display: false,
            },
        },
    };

    const pieChartData = {
        labels,
        datasets: [{
            data,
            backgroundColor,
            borderWidth:1,
            offset,
        }]
    };

   return <Pie options={options} data={pieChartData}/>
}


export const DoughnutChart=({
 labels,
 data,
 backgroundColor,
 cutout,
 legends= true,
 offset,
}) => {
 
 const DoughnutChartData = {
    labels,
    datasets: [{
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
    }]
 }

 const options = {
    responsive: true,
    plugins: {
        legend: {
            display: legends,
            position: "bottom",
            labels:{
                padding: 40,
            },
        },
    },
    cutout,
 };

 return <Doughnut data={DoughnutChartData} options={options}/>
}

export const LineChart = ({
    data,
    label,
    backgroundColor,
    borderColor,
    labels= months,
}) =>{
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display : false,
                }
            },
            x: {
                grid: {
                    display : false,
                },
            },
        }
    }

    const LineChartData = {
        labels,
        datasets: [
            {
                fill:true,
                label,
                data,
                backgroundColor,
                borderColor,
            }
        ],
    };

    return <Line options={options} data={LineChartData}/>
}


