// 1. Import Dependencies
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema to use for relationships

const app = express();
const port = process.env.PORT || 3000;

// 2. Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON in the request body

// 3. Define Mongoose Schemas (with a relationship)
const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  skills: [String],
  // This field will store an array of MongoDB ObjectIDs
  // The 'ref' tells Mongoose that these IDs refer to documents in the 'Project' collection.
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

const ProjectSchema = new mongoose.Schema({
  // We no longer need a custom 'id' field, MongoDB provides a unique '_id' automatically.
  title: String,
  description: String,
  technologies: [String],
  liveDemoUrl: String,
  sourceCodeUrl: String,
});

// Create Mongoose Models (Our interface to the database collections)
const Profile = mongoose.model('Profile', ProfileSchema);
const Project = mongoose.model('Project', ProjectSchema);

// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(error => console.error('Error connecting to MongoDB Atlas:', error));


// --- API Endpoints ---

const apiV1Router = express.Router();

// GET Profile (This is now the ONLY 'get' endpoint we need for fetching data)
apiV1Router.get('/profile', async (req, res) => {
  try {
    // .populate('projects') tells Mongoose to fetch the full project documents
    const profile = await Profile.findOne().populate('projects');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching profile', error });
  }
});

// UPDATE Profile (remains the same)
apiV1Router.put('/profile', async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate({}, req.body, {
      new: true, // This option returns the updated document
      upsert: true // This option creates the document if it doesn't exist
    });
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating profile', error });
  }
});

// Mount the versioned router
app.use('/api/v1', apiV1Router);


// 5. Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
