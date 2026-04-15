import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const Database = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'todo-app',
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.error(`DB not connected : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
