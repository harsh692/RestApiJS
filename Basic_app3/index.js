const express = require("express")
const app = express();
const PORT = 8000;
const mongoose = require("mongoose")

//To append body we use fs moduel( write in file )
const fs = require('fs');

// Mongodb connection
mongoose
    .connect("mongodb://localhost:27017/Testdb1")
    .then(()=> console.log('Mongodb connected'))
    .catch(err => console.log("mongo error",err));
// schema
const userSchema = new mongoose.Schema({
    first_name: {
        type : String,
        required : true
    },
    last_name: {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    gender : {
        type: String,
        required : true
    },
    job_title : {
        type : String,
        reqired : true
    }
})

const User = mongoose.model('user',userSchema);


//middleware : here assumed plugin
app.use(express.urlencoded({extended:false}));
//whatever form data comes, is converted into proper type(JS object) and given in req.body .

// middlewares

app.use((req,res,next) => {
    console.log("hello from middleware 1");
    req.myUserName = "harsh";
    next();
})

app.use((req,res,next) => {
    fs.appendFile("log.txt",`${Date.now()} : ${req.method} : ${req.path}`, (err,data) => {
    next();
    });
})

// routes 

app.get('/users',async (req,res) => {
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.status(201).send(html);
})

app.get('/api/users',async (req,res) => {
    app.get(res.setHeader("Publisher","harsh gupta")); // setting metadata to the request.
    users_list = await User.find({});
    return res.status(201).json(users_list);
})

app.get('/api/users/:id',async (req,res) => {
    const user = await User.findById(req.params.id);
    if (!user) 
        return res.status(404).json({error : "user not found"});
    return res.json(user);
})

app.post('/api/users',async (req,res) => {

    const body = req.body

    if(!body.first_name||
        !body.email||
        !body.job_title||
        !body.gender
    )
    res.json({status:"incomplete input data"});

    await User.create({
        first_name : body.first_name,
        last_name : body.last_name,
        email : body.email,
        gender : body.gender,
        job_title : body.job_title
    });
     
    return res.status(201).json({msg:"success"});
});

app.patch('/api/users/:id',async (req,res) => {

    const id = (req.params.id);
    const user = await User.findById(id);
    user.first_name=req.body.first_name
    user.last_name=req.body.last_name
    user.email=req.body.email
    user.gender=req.body.gender
    user.job_title=req.body.job_title

    await user.save();

    return res.json({status:"edit successful",id:id});
})

app.delete('/api/users/:id',async (req,res) => {

    const id = (req.params.id)
    const user = User.findById(id);
    await user.deleteOne();
    return res.json({status:"user deletion successful", id:id});

})


//iF THE ROUTES HAVE SAME ENDPOINTS BUT DIFFERENT METHODS, THEN THEY CAN BE CLUBBED TOGETHER.

// app
    // .route("/api/users/:id")
    // .get((req, res)=>{
    //     const id = Number(req.params.id);
    //     const user = uses.find((user) => user.id ==id);
    //     return res.json(user);
    // })
    // .patch('/api/users/:id',(req,res) => {
    //     //TODO : edit on user with given id
    //     res.json({status : "pending"});
    // })
    // .delete('/api/users/:id',(req,res) => {
    //     //TODO : DELETE GIVEN USER
    //     res.json({status : "pending"});
    // })


app.listen(PORT, ()=> console.log('server started at port 8000'));

