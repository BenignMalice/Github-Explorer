import {
  getUsers,
  getUser,
  getUserRepos,
  getRepoDetails,
} from "./functions.js";

export async function getUsersRoute(req, res) {
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
}

export async function getUserRoute(req, res) {
  const { username } = req.params;

  try {
    const userData = await getUser(username);
    res.json(userData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getUserReposRoute(req, res) {
  const { username } = req.params;

  try {
    const userRepos = await getUserRepos(username);
    res.json(userRepos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getRepoDetailsRoute(req, res) {
  const { username, repoName } = req.params;

  try {
    const repoDetails = await getRepoDetails(username, repoName);
    res.json(repoDetails);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
