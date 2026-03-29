const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mehulhorus_db_user:81GSLij9ov5eiJPJ@ac-nj6jalw-shard-00-00.oln0rea.mongodb.net:27017,ac-nj6jalw-shard-00-01.oln0rea.mongodb.net:27017,ac-nj6jalw-shard-00-02.oln0rea.mongodb.net:27017/Test_one?ssl=true&replicaSet=atlas-14etva-shard-0&authSource=admin&retryWrites=true&w=majority');
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;