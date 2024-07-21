const tasks = require("../models/task");

async function handleTaskInput(req,res){
    const {task,description} = req.body
    const newtask = new tasks({
        task,
        description
    })
    const savedtask = newtask.save();
    return res.status(200).send(savedtask);
}

async function handleListTasks(req,res){
    const listtasks =await tasks.find({});
    return res.status(200).json(listtasks);
}

async function handleCompletedTasks(req,res){
    const id = req.params.id;
    await tasks.findByIdAndDelete(id);
    return res.status(200).json({"message":"deleted"});
}

async function handleEditTask(req,res){
    const id = req.params.id;
    task=req.body.task;
    description = req.body.description;
    const changedtask = await tasks.findByIdAndUpdate(id,{task:task,description:description});
    changedtask.save();
    return res.status(200).json(changedtask);

}

module.exports = {
    handleTaskInput,
    handleListTasks,
    handleCompletedTasks,
    handleEditTask,
}