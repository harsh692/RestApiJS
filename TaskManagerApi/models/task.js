const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    task:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:false
    },
})

const tasks = mongoose.model('Taskmanager',userSchema);
module.exports = tasks;