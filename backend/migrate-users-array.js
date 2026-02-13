// migrate-users-array.js
import mongoose from "mongoose";
import Project from "./models/project.model.js"; // adjust path if needed

// 🔧 replace with your actual MongoDB connection string
const MONGO_URI = MONGO_URI ; 

const migrateUsersField = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Find projects where `users` is a single ObjectId (wrong type)
    const projects = await Project.find({ users: { $type: "objectId" } });

    console.log(`📦 Found ${projects.length} project(s) to migrate`);

    for (const project of projects) {
      project.users = [project.users]; // wrap into array
      await project.save();
      console.log(`➡️ Migrated project: ${project._id}`);
    }

    console.log("🎉 Migration complete");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

migrateUsersField();
