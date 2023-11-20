// Import necessary modules
import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineLoading } from "react-icons/ai";

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
  const [readmeContent, setReadmeContent] = useState(null);
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

      // Fetch README.md content
      const readmeResponse = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/readme`
      );

      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json();

        if (readmeData && readmeData.content) {
          // Decode base64 content
          const decodedContent = atob(readmeData.content);
          // Set the README.md content
          setReadmeContent(decodedContent);
        }
      }
    } catch (err) {
      // Handle errors and update relevant states
      console.error("Error fetching repository details:", err);
      setRepoDetails(null);
      setCommits([]);
      setReadmeContent(null);
    }

    // Set the selected repo for styling purposes
    setSelectedRepo(repoName);
  };

  return (
    <div className="container">
      <h1>Github User Search</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Github username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? <AiOutlineLoading className="loading-icon" /> : "Search"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="user-section">
          <img className="avatar" src={userData.avatar_url} alt="Profile" />
          <div className="user-info">
            <h2>{userData.login}</h2>

            <p>
              GitHub Profile:{" "}
              <a
                href={`https://github.com/${userData.login}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`https://github.com/${userData.login}`}
              </a>
            </p>
            <p>{userData.bio}</p>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="repositories">
          <h3>Repositories:</h3>
          <div className="repository-list">
            {repos.map((repo) => (
              <div
                key={repo.name}
                onClick={() => handleRepoClick(repo.name)}
                className={`repository-item ${
                  selectedRepo === repo.name ? "selected-repo" : ""
                }`}
              >
                {repo.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {repoDetails && (
        <div id="repository-details" className="repository-details">
          <h3>Repository Details:</h3>

          <p>{`Name: ${repoDetails.name}`}</p>
          <p>{`Description: ${repoDetails.description || "N/A"}`}</p>
          <p>{`Created at: ${new Date(
            repoDetails.created_at
          ).toLocaleDateString()}`}</p>
          <p>{`Last commit at: ${new Date(
            repoDetails.updated_at
          ).toLocaleDateString()}`}</p>
          <p>
            Link:{" "}
            <a
              href={`https://www.github.com/${username}/${repoDetails.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repoDetails.name}
            </a>
          </p>
        </div>
      )}

      {commits.length > 0 && (
        <div className="commit-details">
          <h3>Last 5 Commits:</h3>
          <ul>
            {commits.map((commit) => (
              <li key={commit.sha}>{commit.commit.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
