// Todo: Setup database connection here
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/questions", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB");
  }
};

export default connectMongoDB;
