const express = require('express')
const cors = require('cors');
const app = express();
require("dotenv").config();

// middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<facebook>:<X5c1gCp47qMvoJqL>@asia.gp1dlg6.mongodb.net/?retryWrites=true&w=majority";
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
  try {
    const fbpostCollection = client.db("facebook").collection("post");

    // create a post api
    app.post('/posts', async (req, res) => {
      const posts = req.body;
      const result = await fbpostCollection.insertOne(posts);
      res.send(result);
      console.log(posts);
    });
  }
  finally {
  }
  run().catch((err) => console.error(err));
}

app.get('/', (req, res) => {
  res.send('facebook server is running')
})



app.listen(port, () => {
  console.log(`Facebook server is running on port: ${port}`)
})