const mongoose = require("mongoose")

const Schema = mongoose.Schema;



const userSchema = new Schema({
    regNo : {
        type : String,
        required : true,
        unique : true
    },
    mobileNo : {
        type : Number,
        required : true
    },
    birthDate : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
})


module.exports = mongoose.model('User',userSchema)



