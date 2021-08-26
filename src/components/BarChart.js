import React from "react";
import { Bar } from "react-chartjs-2";


const BarChart = (props) => {
 console.log('inside bar-',props.chartData.datasets[0]);
  return (
    <div>
      <Bar
        data={props.chartData}
        options={{
          maintainAspectRation: false,
        }}
        width={1000}
        height={900}
      />
    </div>
  );
};

export default BarChart;
