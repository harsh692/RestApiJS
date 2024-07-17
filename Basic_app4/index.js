const express = require("express")
const {connectMongoDb} = require("./connection")
//To append body we use fs moduel( write in file )
//______________________________________fs used in middleware/index.js
const {logReqRes} = require("./middlewares") //it by default takes index file therefore no need to mention.

const userRouter = require('./routes/users');

const app = express();
const PORT = 8000;

// Mongodb connection
// _____________________________________ connection.js
connectMongoDb("mongodb://localhost:27017/Testdb1").then(() =>
    console.log("mongodb connected")
);


// schema
// ____________________________________ models/users.js

// Middlewares plugin
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

// routes 
// ___________________________________ routes/users.js

app.use("/users",userRouter);
app.listen(PORT, ()=> console.log('server started at port 8000'));

