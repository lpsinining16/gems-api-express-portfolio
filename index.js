// --- server.js ---

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARE ===
// Enable Cross-Origin Resource Sharing so your Angular app can talk to this API
app.use(cors());
// Enable the express server to parse JSON bodies in requests
app.use(express.json());

// === IN-MEMORY DATABASE (for demonstration) ===
// In a real application, you would connect to a database like MongoDB or PostgreSQL.
let portfolioData = {
  profile: {
    name: "Larry P. Sinining",
    bio: "Innovative Software Engineer with a passion for developing robust and scalable web applications. Experienced in the full software development lifecycle, from concept to deployment.",
    skills: [
      "Angular",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
    contact: {
      email: "larry.sinining@email.com",
      github: "https://github.com/larrysinining",
      linkedin: "https://linkedin.com/in/larrysinining",
    },
  },
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce website with a custom CMS and payment gateway integration.",
      technologies: ["Angular", "NestJS", "PostgreSQL"],
      liveDemoUrl: '#',
      sourceCodeUrl: '#',
    },
    {
      id: 2,
      title: "Real-time Chat Application",
      description:
        "A scalable chat application using WebSockets for instant messaging and user authentication.",
      technologies: ["Angular", "Firebase", "RxJS"],
      liveDemoUrl: '#',
      sourceCodeUrl: '#',
    },
    {
      id: 3,
      title: "Project Management Tool",
      description:
        "An interactive dashboard for visualizing complex datasets using D3.js, providing insightful charts and graphs for business intelligence.",
      technologies: [
        "Angular",
        "TypeScript",
        "Drag & Drop API",
        "Node.js",
        "MongoDB",
      ],
      liveDemoUrl: '#',
      sourceCodeUrl: '#',
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      description:
        "A scalable chat application using WebSockets for instant messaging and user authentication.",
      technologies: ["Angular", "D3.js", "RxJs", "REST APIs", "SCSS"],
      liveDemoUrl: '#',
      sourceCodeUrl: '#',
    },
  ],
};

// === API ROUTES (ENDPOINTS) ===

// --- Profile Routes ---
app.get("/api/v1/profile", (req, res) => {
  res.json(portfolioData.profile);
});

app.put("/api/v1/profile", (req, res) => {
  // Update the profile data with the data from the request body
  portfolioData.profile = { ...portfolioData.profile, ...req.body };
  res.json(portfolioData.profile);
});

// --- Project Routes ---
app.get("/api/v1/projects", (req, res) => {
  res.json(portfolioData.projects);
});

// Get a single project by its ID
app.get("/api/v1/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const project = portfolioData.projects.find((p) => p.id === projectId);

  if (project) {
    res.json(project);
  } else {
    res.status(404).send("Project not found");
  }
});

app.post("/api/v1/projects", (req, res) => {
  const newProject = {
    id: Date.now(), // Create a unique ID for the new project
    ...req.body,
  };
  portfolioData.projects.push(newProject);
  res.status(201).json(newProject);
});

// === START THE SERVER ===
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
