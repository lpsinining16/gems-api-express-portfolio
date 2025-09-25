require('dotenv').config();
const mongoose = require('mongoose');

// Define Schemas and Models (copy from server.js)
const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  skills: [String]
});

const ProjectSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  technologies: [String],
  liveDemoUrl: String,
  sourceCodeUrl: String,
});

const Profile = mongoose.model('Profile', ProfileSchema);
const Project = mongoose.model('Project', ProjectSchema);

// Your initial data
const initialProfile = {
  name: 'Larry P. Sinining',
  title: 'Full Stack Software Engineer',
  bio: "Innovative Software Engineer with a passion for developing robust and scalable web applications. Experienced in the full software development lifecycle, from concept to deployment. Adept at problem-solving and working collaboratively in agile environments to deliver high-quality software solutions.",
  skills: ['Angular', 'React', 'Vue.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'CI/CD']
};

const initialProjects = [
  { id: '1', title: 'E-commerce Platform', description: 'A full-featured e-commerce website with a custom CMS, payment gateway integration, and a responsive user interface built with Angular and NestJS.', technologies: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Tailwind CSS'], liveDemoUrl: '#', sourceCodeUrl: '#' },
  { id: '2', title: 'Real-time Chat Application', description: 'A scalable chat application using WebSockets for instant messaging, user authentication, and private messaging features. Powered by Firebase.', technologies: ['Angular', 'Firebase', 'RxJS', 'NgRx', 'Angular Material'], liveDemoUrl: '#', sourceCodeUrl: '#' },
  { id: '3', title: 'Project Management Tool', description: 'A collaborative Kanban-style project management board with drag-and-drop functionality, task assignments, and progress tracking.', technologies: ['Angular', 'TypeScript', 'Drag & Drop API', 'Node.js', 'MongoDB'], liveDemoUrl: '#', sourceCodeUrl: '#' },
  { id: '4', title: 'Data Visualization Dashboard', description: 'An interactive dashboard for visualizing complex datasets using D3.js, providing insightful charts and graphs for business intelligence.', technologies: ['Angular', 'D3.js', 'RxJS', 'REST APIs', 'SCSS'], liveDemoUrl: '#', sourceCodeUrl: '#' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Profile.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data.');

    // Insert new data
    await Profile.create(initialProfile);
    await Project.create(initialProjects);
    console.log('Database has been successfully seeded!');

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

seedDatabase();

