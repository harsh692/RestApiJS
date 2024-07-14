const express = require("express")
const users = require("./test_data.json")
const app = express();
const PORT = 8000;

//To append body we use fs moduel( write in file )
const fs = require('fs');

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

app.get('/users',(req,res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
})

app.get('/api/users',(req,res) => {
    app.get(res.setHeader("Publisher","harsh gupta")); // setting metadata to the request.
    return res.json(users);
})

app.get('/api/users/:id',(req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.post('/api/users',(req,res) => {

    const body = req.body
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./test_data.json',JSON.stringify(users), (err,data)=>{
        return res.json({status:"successful", id: users.length});
    });
    //We will directly add data with the help of fs file
});

app.patch('/api/users/:id',(req,res) => {

    const id = Number(req.params.id);
    const user = users.find((user) => user.id ==id)
    user.first_name=req.body.first_name
    user.last_name=req.body.last_name
    user.email=req.body.email
    user.gender=req.body.gender
    user.job_title=req.body.job_title

    return res.json({status:"edit successful",id:id});
})

app.delete('/api/users/:id',(req,res) => {

    const id = Number(req.params.id)
    const user = users.findIndex((user) => user.id == id)
    users.splice(user,1)
    return res.json({status:"user deletion successful", id:id});

})


//iF THE ROUTES HAVE SAME ENDPOINTS BUT DIFFERENT METHODS, THEN THEY CAN BE CLUBBED TOGETHER.

app
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

