const mongoose = require("mongoose");
const userSchema =new mongoose.Schema({
    currentExp: {
        type : String,
    },
    currentAns: {
        type : String,
    }
},
{
    timestamps: true,
});

const calcmodel = mongoose.model("calc",userSchema);
module.exports = calcmodel;