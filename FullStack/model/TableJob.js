const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    nameJob: {required: true, type:String},
    content: {required: true, type:String},
    process: {required: true, type:String},
    user: [{required: true, type:String}]
})

module.exports = mongoose.model("tableJob", userSchema)