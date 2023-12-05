import {
  getUsers,
  getUser,
  getUserRepos,
  getRepoDetails,
} from "./functions.js";

// Route to fetch user data based on provided usernames
export async function getUsersRoute(req, res) {
  const { names } = req.query;

  try {
    // Parse the 'names' query parameter into an array
    const namesArray = JSON.parse(names);

    // Check if the parsed parameter is an array
    if (!Array.isArray(namesArray)) {
      throw new Error("Invalid parameter: names must be an array");
    }

    // Fetch user data for the provided usernames
    const usersData = await getUsers(namesArray);

    // Send the user data as a JSON response
    res.json(usersData);
  } catch (error) {
    // Handle errors and send a 400 Bad Request response with the error message
    return res.status(400).json({ error: error.message });
  }
}

// Route to fetch user data based on a username
export async function getUserRoute(req, res) {
  const { username } = req.params;

  try {
    // Fetch user data for the provided username
    const userData = await getUser(username);
    res.json(userData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// Route to fetch user repositories based on a username
export async function getUserReposRoute(req, res) {
  const { username } = req.params;

  try {
    // Fetch repositories for the provided username
    const userRepos = await getUserRepos(username);
    res.json(userRepos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// Route to fetch details of a specific repository based on a username and repoName
export async function getRepoDetailsRoute(req, res) {
  const { username, repoName } = req.params;

  try {
    // Fetch details of the specified repository
    const repoDetails = await getRepoDetails(username, repoName);
    res.json(repoDetails);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
