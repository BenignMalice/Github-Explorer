// Import necessary modules
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import helmet from "helmet";

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());
// Use Helmet middleware to enhance the security of the app by setting HTTP headers
app.use(helmet());
// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Route to fetch user data
app.get("/api/users", async (req, res) => {
  const { names } = req.query;

  try {
    const namesArray = JSON.parse(names);

    if (!Array.isArray(namesArray)) {
      throw new Error("Invalid parameter: names must be an array");
    }

    const usersData = await getUsers(namesArray);
    res.json(usersData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route to fetch user data by providing a username
app.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch data for the specified username
    const userData = await getUser(username);
    res.json(userData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route to fetch repositories for a user by providing a username
app.get("/api/users/:username/repos", async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch repositories for the specified username
    const userRepos = await getUserRepos(username);
    res.json(userRepos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route to fetch details of a specific repository by providing a username and repoName
app.get("/api/users/:username/repos/:repoName", async (req, res) => {
  const { username, repoName } = req.params;

  try {
    // Fetch details of the specified repository
    const repoDetails = await getRepoDetails(username, repoName);
    res.json(repoDetails);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Asynchronous function to fetch data for multiple usernames in parallel
async function getUsers(names) {
  const jobs = names.map(async (name) => await getUser(name));
  const results = await Promise.all(jobs);
  return results;
}

// Asynchronous function to fetch user data by providing a username
async function getUser(username) {
  try {
    // Fetch user data from the GitHub API
    const response = await fetch(`https://api.github.com/users/${username}`);
    // Check if the response is successful
    if (!response.ok) {
      console.error(
        `Failed to fetch user ${username}. Status: ${response.status}`
      );
      throw new Error("User not found");
    }
    // Parse and return user data
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    throw new Error("Error fetching user");
  }
}

// Asynchronous function to fetch repositories for a user by providing a username
async function getUserRepos(username) {
  try {
    // Fetch repositories for the specified username from the GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch repositories for ${username}. Status: ${response.status}`
      );
      throw new Error("Unable to fetch repositories");
    }

    const reposData = await response.json();
    return reposData;
  } catch (error) {
    console.error(`Error fetching repositories for ${username}:`, error);
    throw new Error("Error fetching repositories");
  }
}

// Asynchronous function to fetch details of a specific repository by providing a username and repoName
async function getRepoDetails(username, repoName) {
  try {
    // Fetch details of the specified repository from the GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}`
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch repository ${repoName}. Status: ${response.status}`
      );
      throw new Error("Unable to fetch repository details");
    }

    const repoDetails = await response.json();
    return repoDetails;
  } catch (error) {
    console.error(`Error fetching repository ${repoName} details:`, error);
    throw new Error("Error fetching repository details");
  }
}
// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the Express app for testing purposes
export default app;
