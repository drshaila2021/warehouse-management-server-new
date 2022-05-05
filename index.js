const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
app = express();

const port = process.env.PORT || 4001;

// use middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwo5q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const furnitureColection = client.db("furniture").collection("items");
    // load data
    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = furnitureColection.find(query);
      const items = await cursor.toArray();
      console.log(items);
      res.send(items);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server site is running");
});

app.listen(port, () => {
  console.log("server is running", port);
});
