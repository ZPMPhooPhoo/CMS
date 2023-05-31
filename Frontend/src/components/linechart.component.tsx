// import React, { useState } from "react";
// import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, LineControllerChartOptions } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const LineChart: React.FC = () => {
//   const [chartData, setChartData] = useState({
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       {
//         label: "Projects",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: true,
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//       },
//     ],
//   });

//  return (
//     <div className="linechart">
//       <div className="chart-container"  >
//         <div className="chart-size">
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: { position: "top" },
//               title: { display: true, text: "Projects by Month" },
//             },
//           }}
//         />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LineChart;



import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, LineControllerChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import axios from 'axios';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ProjectData {
  month: string;
  count: number;
}

const LineChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Projects",
        data: [],
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get<ProjectData[]>("http://127.0.0.1:8000/api/prj-chart", {
        headers: headers,
      });
      const projects = response.data.data;
      console.log(projects)

      // Extracting the required data from projects
      const labels = projects.map((project: { month: any; }) => project.month);
      //console.log(labels+ 'labels');
      const data = projects.map((project: { count: any; }) => project.count);
      //console.log(data + 'data');

      setChartData((prevChartData) => ({
        ...prevChartData,
        labels: labels,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: data,
          },
        ],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="linechart">
      <div className="chart-container"  >
        <div className="chart-size">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Projects by Month" },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
