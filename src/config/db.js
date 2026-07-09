import mongoose from "mongoose";

let cached = globalThis.mongooseCache;

if (!cached) {
  cached = globalThis.mongooseCache = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    mongoose.set("bufferCommands", false);

    if (!cached.promise) {
      cached.promise = mongoose
        .connect(process.env.MONGO_URI, {
          serverSelectionTimeoutMS: 10000,
        })
        .then((mongooseInstance) => {
          console.log(
            `MongoDB Connected: ${mongooseInstance.connection.host}`
          );

          return mongooseInstance;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error(`MongoDB Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;