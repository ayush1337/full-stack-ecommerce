import mongoose from 'mongoose';

let connection;

async function dbConnect() {
  try {
    if (!connection) {
      connection = await mongoose.connect(process.env.MONGODB_URI);
    }
    return connection;
  } catch (error) {
    throw new Error('Connection failed!');
  }
}

export default dbConnect;
