var app = require("express")();
const socketio = require("socket.io");
const cors = require("cors");
var port = 8000 || process.env;
var bodyParser = require("body-parser");

var server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));

var data = [];

const io = socketio(server);

io.set("origins", "*:*");

io.on("connection", socket => {
  console.log("A client joined");

  socket.on("DataPoint", data1 => {
    data.push(data1);
    io.sockets.emit("NewData", {
      data_points: data
    });
  });

  socket.on("disconnect", () => {
    console.log("A Client Left");
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the server..");
});

app.get("/fetch_series", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ series: [100, 200, 300, 400, 500] }));
});

app.use(cors());
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
