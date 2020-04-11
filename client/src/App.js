import React, { useState, useEffect } from "react";
import Graph from "./Components/Graph/Graph";
const App = () => {
  const [series, setSeries] = useState({ series: [] });
  const [timer, setTimer] = useState(-1);
  const [randomN, setRandomN] = useState([]);
  useEffect(() => {
    fetch("/fetch_series")
      .then(resp => resp.json())
      .then(value => {
        console.log(value["series"]);
        if (series["series"].length == 0) {
          setSeries(value);
        }
        console.log(series);
      });
  }, [series]);

  useEffect(() => {
    if (timer != -1) {
      const interval = setInterval(() => {
        setRandomN([...randomN, Math.floor(Math.random() * 1000)]);
        console.log(randomN);
      }, timer * 1000);
      return () => clearInterval(interval);
    }
  }, [timer, randomN]);

  onsubmit = event => {
    event.preventDefault();
    setTimer(event["target"]["second"].value);
  };

  return series["series"].length ? (
    <div>
      <form onSubmit={onsubmit}>
        <input type="text" name="second" placeholder="enter seconds" />
        <input type="submit"></input>
      </form>
      <Graph series={series["series"]} random={randomN} />
    </div>
  ) : (
    <h1>Wait for the data</h1>
  );
};

export default App;
