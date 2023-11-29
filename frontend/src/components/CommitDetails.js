import React from "react";

function CommitDetails({ commits }) {
  return (
    <div className="commit-details">
      <h3>Last 5 Commits:</h3>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>{commit.commit.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommitDetails;
