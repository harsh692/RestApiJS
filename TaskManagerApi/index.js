const express = require("express");

const app = express();
const PORT = 8000;

const {handleMongooseConnection} = require("./connector");
handleMongooseConnection("mongodb://localhost:27017/Taskmanager").then(()=>{
    console.log("mongodb connected at mongodb://localhost:27017/");
})

const router = require("./routes/task");

app.use(express.json());
app.use('/',router);
app.listen(PORT,()=>{
    console.log("app started at port 8000.");
});