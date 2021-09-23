/* In this file we define our schemas, which are a description of the structure of the document */
const mongoose = require("mongoose");
const Schema = mongoose.Schema; //this is a constructor function.

const deviceSchema = new Schema({ //We instantiate a Schema with the constructor function

   
    modelName:{
        type: String,
        required: true
    },


    price:{
        type: Number,
        required: true
    },

    brand:{
        type: String,
        required: true
    },

    operatingSystem:{
        type:String,
        required:true
    },

    ram:{
        type: Number,
        required:true
    },

    faceRecognition:{
        type: String,
        required:true
    },

    processor:{
        type: String,
        required: true
    },

    cpuScore :{
        type: Number,
        required: false
    },

    fingerprint:{
        type:String,
        required:true
    },

    camera_MP: {
        type: Number,
        required: true
    },

    dualSIM:{
        type: String,
        required: true
    },

    bluetoothVersion:{
        type:Number,
        required: true
    },

    batteryHours:{
        type:Number,
        required:true
    },

    weight: {
        type: Number,
        required: true
    },

    isUsed:{
        type:String,
        required: true
    },

    link:{
        type:String,
        required:true
    },
    rating:{
        type:Number
        //required:true
    },

/*     image:{
        type: binData,
        required:true
    }, */





}, {timestamps: true});//we add a timestamp for each new record of this schema (optional)


/* We will now create a model that is based on this schema. A model defines an interface in order to communicate with
the type of documents defined by the schema. Note that the name of the model has normally a capital letter first,
and it must be the singular of the collection's name in order for mongoose to look up the collection automatically */

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
