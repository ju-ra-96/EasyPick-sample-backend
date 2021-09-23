"use strict";

const multer = require("multer");
const express = require("express");
const router = express.Router();
const upload = multer({dest: "./uploads/"});

//const middlewares = require("../middlewares");
const DeviceController = require("../controllers/device");

router.post("/saveNewDevice", upload.none(), DeviceController.save);

router.get("/products", DeviceController.list);
router.get("/getDevice/:id", DeviceController.getDevice);
router.put("/updateDevice/:id", DeviceController.update);
router.delete("/deleteDevice/:id", DeviceController.deleteDevice);

module.exports = router;
