var app = require("express")();

var port = 3001 || process.env;
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

var data = {};
var idx = 0;

app.get("/", (req, res) => {
  res.send("Welcome to the server..");
});
app.get("/fetch_series", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  data[idx] = [100, 200, 300, 400, 500];
  res.end(JSON.stringify({ series: [100, 200, 300, 400, 500], id: idx++ }));
});

app.get("/store_series", (req, res) => {
  data[req.param("id")].push(parseInt(req.param("val")));
  console.log(data);
  res.end();
});

app.get("/show_series", (req, res) => {
  const id = req.param("id");
  res.end(JSON.stringify({ series: data[id][0] }));
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
