const mongoose = require("mongoose");

async function handleMongooseConnection(url){
    return mongoose.connect(url);
}

module.exports = {
    handleMongooseConnection,
}