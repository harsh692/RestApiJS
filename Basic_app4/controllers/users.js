const User = require("../models/users");


async function handleGetAllUsers(req,res){
    users_list = await User.find({});
    return res.status(201).json(users_list);
}

async function handleGetSingleUserById(req,res){
    const user = await User.findById(req.params.id);
    if (!user) 
        return res.status(404).json({error : "user not found"});
    return res.json(user);
}

async function handlecreateUser(req,res){
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
}

async function handleEditUserById(req,res){
    const id = (req.params.id);
    const user = await User.findById(id);
    user.first_name=req.body.first_name
    user.last_name=req.body.last_name
    user.email=req.body.email
    user.gender=req.body.gender
    user.job_title=req.body.job_title

    await user.save();

    return res.json({status:"edit successful",id:id});
}

async function handleDeleteUserById(req,res){
    const id = (req.params.id)
    const user = User.findById(id);
    await user.deleteOne();
    return res.json({status:"user deletion successful", id:id});
}

module.exports = {
    handleGetAllUsers,
    handleGetSingleUserById,
    handlecreateUser,
    handleEditUserById,
    handleDeleteUserById,
};