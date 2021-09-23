const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb URI can be inserted here", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    autoIndex: false,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;
