// Import necessary modules
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import UserInfo from "./components/UserInfo";
import Repositories from "./components/Repositories";
import RepositoryDetails from "./components/RepositoryDetails";
import CommitDetails from "./components/CommitDetails";
import "./App.css";

// Define the main App component
function App() {
  // State variables to manage user input, data, errors, and loading state
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle user search
  const handleSearch = async () => {
    try {
      setLoading(true);
      // Fetch user data from the Express backend
      const response = await fetch(
        `http://localhost:3001/api/users?names=${encodeURIComponent(
          JSON.stringify([username])
        )}`
      );
      const data = await response.json();

      if (data && !data.error) {
        // If successful, update user data and fetch repositories
        setUserData(data[0]);
        setError(null);

        // Fetch user repositories from the Express backend
        const reposResponse = await fetch(
          `http://localhost:3001/api/users/${username}/repos`
        );

        if (!reposResponse.ok) {
          throw new Error("Unable to fetch repositories");
        }

        const reposData = await reposResponse.json();
        setRepos(reposData);
        setSelectedRepo(null);
        setRepoDetails(null);
        setCommits([]);
      } else {
        // If there is an error, update error state
        setUserData(null);
        setRepos([]);
        setSelectedRepo(null);
        setRepoDetails(null);
        setCommits([]);
        setError(data.error || "Error searching for user");
      }
    } catch (err) {
      // Handle errors and update error state
      setUserData(null);
      setRepos([]);
      setSelectedRepo(null);
      setRepoDetails(null);
      setCommits([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle click on a repository
  const handleRepoClick = async (repoName) => {
    try {
      // Fetch repository details from the Express backend
      const repoDetailsResponse = await fetch(
        `http://localhost:3001/api/users/${username}/repos/${repoName}`
      );

      if (!repoDetailsResponse.ok) {
        throw new Error("Unable to fetch repository details");
      }

      const repoDetailsData = await repoDetailsResponse.json();
      setRepoDetails(repoDetailsData);

      // Fetch the last 5 commits
      const commitsResponse = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/commits?per_page=5`
      );

      if (!commitsResponse.ok) {
        throw new Error("Unable to fetch commits");
      }

      const commitsData = await commitsResponse.json();
      setCommits(commitsData);

      // Set the selected repo for styling purposes
      setSelectedRepo(repoName);
    } catch (err) {
      // Handle errors and update relevant states
      console.error("Error fetching repository details:", err);
      setRepoDetails(null);
      setCommits([]);
    }
  };

  return (
    <div className="container">
      <h1>Github User Search</h1>
      <SearchForm
        username={username}
        setUsername={setUsername}
        handleSearch={handleSearch}
        loading={loading}
      />
      {error && <p className="error">{error}</p>}
      {userData && <UserInfo userData={userData} />}
      {repos.length > 0 && (
        <Repositories
          repos={repos}
          selectedRepo={selectedRepo}
          handleRepoClick={handleRepoClick}
        />
      )}
      {repoDetails && <RepositoryDetails repoDetails={repoDetails} />}
      {commits.length > 0 && <CommitDetails commits={commits} />}
    </div>
  );
}

export default App;
