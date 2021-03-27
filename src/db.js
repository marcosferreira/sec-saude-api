import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(MONGODB_URI, options)
  .then(() => console.log(`Success connected database!`))
  .catch((error) => console.log(`Error connect database!!!`, error.message));
