// import React, { useState } from "react";
// import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const BarChart: React.FC = () => {
//   const [chartData, setChartData] = useState({
//     labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
//     datasets: [
//       {
//         label: "Customers",
//         data: [65, 59, 80, 81, 56, 55, 40,32,70,50,200, 24, 56, 57],
//         fill: true,
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor:" #e96f28",
//       },
//     ],
//   });

//  return (
//     <div className="BarChart">
//       <div className="chart-container"  >
//         <div className="chart-size">
//         <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { position: "top" },
//                 title: { display: true, text: "Number of Customers" },
//               },
//               scales: {
//                 y: {
//                   max: 200,
//                   beginAtZero: true,
//                   ticks: {
//                     stepSize: 10,
//                   },
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarChart;





// import React, { useState } from "react";
// import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const BarChart: React.FC = () => {
//   const [chartData, setChartData] = useState({
//     labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
//     datasets: [
//       {
//         label: "Customers",
//         data: [65, 59, 80, 81, 56, 55, 40, 32, 70, 50, 200, 24, 56, 57],
//         fill: true,
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "#e96f28",
//       },
//     ],
//   });

//   const yMax = 200;
//   const yStepSize = Math.ceil(yMax / 10); // Calculate the step size

//   return (
//     <div className="BarChart">
//       <div className="chart-container">
//         <div className="chart-size">
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { position: "top" },
//                 title: { display: true, text: "Number of Customers" },
//               },
//               scales: {
//                 y: {
//                   max: yMax,
//                   beginAtZero: true,
//                   ticks: {
//                     stepSize: yStepSize,
//                   },
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarChart;

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from 'axios';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://127.0.0.1:8000/api/customer-chart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      //console.log(data);

      const labels = data.map((item: any) => item.month);
      //console.log(labels);
      const customerCount = data.map((item: any) => item.customer_count);
      //console.log(customerCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Customers",
            data: customerCount,
            fill: true,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "#e96f28",
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const yMax = 200;
  const yStepSize = Math.ceil(yMax / 10);

  return (
    <div className="BarChart">
      <div className="chart-container">
        <div className="chart-size">
          {chartData ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Customers by Month" },
                },
                scales: {
                  y: {
                    max: yMax,
                    beginAtZero: true,
                    ticks: {
                      stepSize: yStepSize,
                    },
                  },
                },
              }}
            />
          ) : (
            <div>Loading chart data...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarChart;