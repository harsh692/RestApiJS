const express = require("express");

const app = express();
const PORT = 8000;

const router = require("./routes/calc");
const {connectMongoDb} = require("./connect");
connectMongoDb("mongodb://localhost:27017/Testdb1").then(() =>
    console.log("mongodb connected")
);

app.use(express.json());
app.use('/calc',router);
app.listen(PORT,()=>{
    console.log("server connected at PORT 8000");
});
