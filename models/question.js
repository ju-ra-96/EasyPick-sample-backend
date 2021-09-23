const mongoose = require('mongoose');
const Schema = mongoose.Schema;//We instantiate a Schema with the constructor function

const questionSchema = new Schema({
    1:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
    2:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
    3:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
    4:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
    5:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
    6:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
    7:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
    8:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
    9:{
        type:String,
        required: true,
    },
     a:{
        type:String,
        required: true,
    },
    10:{
        type:String,
        required: true,
    },
    a:{
        type:String,
        required: true,
    },
}, { timestamps: true });

const questionsSchema = new Schema({
    anwers: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.model("Questions", questionSchema);
