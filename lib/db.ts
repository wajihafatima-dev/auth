import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define mongo_uri in env variables");
}

let cachedConn: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

export async function connectDb() {
  if (cachedConn) {
    return cachedConn;
  }

  if (!cachedPromise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cachedPromise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cachedConn = await cachedPromise;
  } catch (error) {
    cachedPromise = null;
    throw error;
  }

  return cachedConn;
}
