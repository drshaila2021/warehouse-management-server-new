const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
      res.send(items);
    });
    // get single item
    app.get("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await furnitureColection.findOne(query);
      res.send(result);
    });
    // post new item
    app.post("/inventory", async (req, res) => {
      const newItem = req.body;
      const result = await await furnitureColection.insertOne(newItem);
      res.send(result);
    });

    // update data
    app.put("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const updatedQuantity = req.body;
      const filter = { _id: ObjectId(id) };
      console.log(updatedQuantity);
      const updatedDoc = {
        $set: {
          quantity: updatedQuantity.quantity,
          // about: updatedService.about,
        },
      };

      const options = { upsert: true };
      const result = await furnitureColection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // item delete
    app.delete("/inventory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await furnitureColection.deleteOne(query);
      res.send(result);
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
