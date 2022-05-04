const express = require("express");
const cors = require("cors");
app = express();

const port = process.env.PORT || 4001;

// use middleware

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server site is running");
});

app.listen(port, () => {
  console.log("server is running", port);
});
