import React, { useState, useEffect } from "react";
import Graph from "./Components/Graph/Graph";
import io from "socket.io-client";
import useSocket from "use-socket.io-client";

let socket;
const ENDPOINT = "https://localhost:8000/";
const App = () => {
  const [series, setSeries] = useState({ series: [] });
  const [timer, setTimer] = useState(-1);
  const [randomN, setRandomN] = useState([]);
  const [socketSet, setSocketSet] = useState(false);


  useEffect(() => {
    if (!socketSet) {
      socket = io("http://localhost:8000/");
      console.log("Client initiataited socket");
      setSocketSet(true);
    }
    socket.on("NewData", function(obj) {
      // console.log("OBJEX SOC", obj);
      setRandomN(obj["data_points"]);
    });
    return () => {
      socket.emit("disconnect");
      console.log("disconnected");
      socket.off();
    };
  }, [ENDPOINT, socketSet]);

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
        var value = Math.floor(Math.random() * 1000);
        socket.emit("DataPoint", value);

        socket.on("NewData", function(obj) {
          // console.log("OBJEX SOC", obj);
          setRandomN(obj["data_points"]);
        });

        // setRandomN([...randomN, value]);
        console.log("The random Arr", randomN);
      }, timer * 1000);

      return () => clearInterval(interval);
      
    }
    socket.on("NewData", function(obj) {
      // console.log("OBJEX SOC", obj);
      setRandomN(obj["data_points"]);
    });
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
