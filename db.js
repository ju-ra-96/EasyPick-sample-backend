const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://ilias:ilias123@cluster0.r7ad4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    autoIndex: false,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;
