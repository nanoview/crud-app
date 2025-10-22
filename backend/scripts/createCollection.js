import 'dotenv/config';
import mongoose from 'mongoose';

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not set in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;

    const existing = await db.listCollections({ name: 'books' }).toArray();
    if (existing.length === 0) {
      await db.createCollection('books');
      console.log("Created collection 'books'");
    } else {
      console.log("Collection 'books' already exists");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Failed to create collection:', err.message || err);
    process.exit(1);
  }
}

main();
