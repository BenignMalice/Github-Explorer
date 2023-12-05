import fetch from "node-fetch";

// Function to fetch data for multiple usernames in parallel
export async function getUsers(names) {
  // Create an array of asynchronous jobs to fetch user data for each name
  const jobs = names.map(async (name) => await getUser(name));
  // Wait for all jobs to complete and return the results as an array
  const results = await Promise.all(jobs);
  return results;
}

// Function to fetch user data by providing a username
export async function getUser(username) {
  try {
    // Fetch user data from the GitHub API
    const response = await fetch(`https://api.github.com/users/${username}`);

    // Check if the response is successful (HTTP status code 200)
    if (!response.ok) {
      console.error(
        `Failed to fetch user ${username}. Status: ${response.status}`
      );
      throw new Error("User not found");
    }

    // Parse and return the user data as a JavaScript object
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    throw new Error("Error fetching user");
  }
}
// Function to fetch repositories for a user by providing a username
export async function getUserRepos(username) {
  try {
    // Fetch repositories for the specified username from the GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    // Check if the response is successful (HTTP status code 200)
    if (!response.ok) {
      if (!response.ok) {
        console.error(
          `Failed to fetch repositories for ${username}. Status: ${response.status}`
        );
        throw new Error("Unable to fetch repositories");
      }
    }
    // Parse and return the repositories data as an array of objects
    const reposData = await response.json();
    return reposData;
  } catch (error) {
    console.error(`Error fetching repositories for ${username}:`, error);
    throw new Error("Error fetching repositories");
  }
}
// Function to fetch details of a specific repository by providing a username and repoName
export async function getRepoDetails(username, repoName) {
  try {
    // Fetch details of the specified repository from the GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}`
    );

    // Check if the response is successful (HTTP status code 200)
    if (!response.ok) {
      console.error(
        `Failed to fetch repository ${repoName}. Status: ${response.status}`
      );
      throw new Error("Unable to fetch repository details");
    }

    // Parse and return the repository details as a JavaScript object
    const repoDetails = await response.json();
    return repoDetails;
  } catch (error) {
    console.error(`Error fetching repository ${repoName} details:`, error);
    throw new Error("Error fetching repository details");
  }
}
