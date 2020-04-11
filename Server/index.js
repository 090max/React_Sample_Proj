var app = require("express")();

var port = 3001 || process.env;

app.get("/", (req, res) => {
  res.send("Welcome to the server..");
});
app.get("/fetch_series", (req, res) => {
  console.log("Hit");
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ series: [100, 200, 300, 400, 500] }));
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
