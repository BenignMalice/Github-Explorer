import fetch from "node-fetch";

export async function getUsers(names) {
  const jobs = names.map(async (name) => await getUser(name));
  const results = await Promise.all(jobs);
  return results;
}

export async function getUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      console.error(
        `Failed to fetch user ${username}. Status: ${response.status}`
      );
      throw new Error("User not found");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    throw new Error("Error fetching user");
  }
}

export async function getUserRepos(username) {
  try {
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

export async function getRepoDetails(username, repoName) {
  try {
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
