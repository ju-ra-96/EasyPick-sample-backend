"use strict";
const multer = require("multer");
const upload = multer({dest: "./uploads/"});

const Device = require("../models/device");

const save = async (req, res) => {
    // check if the body of the request contains all necessary properties
    const device = new Device(req.body);

    device.save()
      .then((result)=>{
        res.send("Device has been saved into MongoDB!");
        //res.redirect("/");
      })
      .catch((err)=>{
        console.log(err);
      })
};

const list = async (req, res) => {
  try {
      let devices = await Device.find({}).exec();

      return res.status(200).json(devices);
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          error: "Internal server error",
          message: err.message,
      });
  }
};

const getDevice = async (req, res) => {
  try {
      let device = await Device.findById(req.params.id).exec();

      if (!device)
          return res.status(404).json({
              error: "Not Found",
              message: `Device not found`,
          });

      return res.status(200).json(device);
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          error: "Internal Server Error",
          message: err.message,
      });
  }
};

const update = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
          error: "Bad Request",
          message: "The request body is empty",
      });
  }


  try {
      let device = await Device.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
              new: true,
              runValidators: true,
          }
      ).exec();

    
      return res.status(200).json(device);
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          error: "Internal server error",
          message: err.message,
      });
  }
};

const deleteDevice = async (req, res) => {
    try {
        await Device.findByIdAndRemove(req.params.id).exec();

        return res
            .status(200)
            .json({ message: `Device with id${req.params.id} was deleted` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    save,
    list,
    deleteDevice,
    update,
    getDevice,
};
