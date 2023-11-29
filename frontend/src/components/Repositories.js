import React from "react";

function Repositories({ repos, selectedRepo, handleRepoClick }) {
  return (
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
  );
}

export default Repositories;
