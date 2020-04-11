import React, { useState, useEffect } from "react";
import CanvasJSChart from "../Canvas/canvasjs.react";

const Graph = ({ series, random }) => {
  const [timerData, setTimerData] = useState({
    title: {
      text: "Active Cases Visualization"
    }
  });
  useEffect(() => {
    if (series.length > 0 || random.length > 0) {
      var arr = [];
      var final_arr = [];
      var idx = 0;
      console.log("series ", series);
      console.log("random ", random);
      series.forEach(elem => {
        var obj = {};
        obj["x"] = idx;
        obj["y"] = elem;
        final_arr.push(obj);
        idx++;
        arr.push(elem);
      });
      random.forEach(elem => {
        var obj = {};
        obj["x"] = idx;
        obj["y"] = elem;
        final_arr.push(obj);
        idx++;
        arr.push(elem);
      });
    }

    console.log("Final Arr ", final_arr);
    var timer_data = {
      title: {
        text: "Timer"
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 5,
            left: 15,
            right: 15,
            bottom: 15
          }
        }
      },
      axisX: {
        title: "Timer",
        gridThickness: 2,
        //   valueFormatString: "MMM DD",
        ticks: {
          stepSize: 10
        }
      },
      axisY: {
        title: "Value"
      },
      data: [
        {
          // labels: labels,
          type: "area",
          dataPoints: final_arr
        }
      ]
    };
    setTimerData(timer_data);
  }, [series, random]);

  return <CanvasJSChart options={timerData} />;
};

export default Graph;
