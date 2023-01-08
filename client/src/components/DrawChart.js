import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Bar } from "react-chartjs-2";

ChartJS.register(TimeScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DrawChart = ({ sleeps }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Sleep Chart",
        color: "white",
      },
    },
  };

  const data = {
    // labels: sleeps.map((x) => new Date(x.date)),
    labels: sleeps.map((x) => x.date),
    datasets: [
      {
        label: "Duration",
        data: sleeps.map((x) => x.time),
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 153, 76, 0.8)",
        borderRadius: 10,
      },
    ],
  };

  // useEffect(() => {}, []);

  return (
    <div>
      <div className="container my-5 text-light">
        {sleeps.length > 4 ? (
          <Bar options={options} data={data} />
        ) : (
          <div>You need 5 days to see a chart.</div>
        )}
        {/* <Bar options={options} data={data} /> */}
      </div>
    </div>
  );
};

export default DrawChart;
