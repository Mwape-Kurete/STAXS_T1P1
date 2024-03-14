import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function Linegraph() {
  <div className="lineGraph">
    <Line
      data={{
        labels: ["1", "2", "3", "4", "5", "6"],
        datasets: [
          {
            label: "Danceability",
            data: [1500, 2500, 1000, 1700, 2700, 3000],
            backgroundColor: ["rgba(255, 255, 255, 0.8)"],
            borderColor: "rgba(255, 255, 255, 1)",
          },
        ],
      }}
    />
  </div>;
}

export default Linegraph;
