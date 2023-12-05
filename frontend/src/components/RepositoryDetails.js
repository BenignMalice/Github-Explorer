import React from "react";

// Functional component to display the details of a specific repository
function RepositoryDetails({ repoDetails }) {
  return (
    <div id="repository-details" className="repository-details">
      <h3>Repository Details:</h3>
      <p>{`Name: ${repoDetails.name}`}</p>
      <p>{`Description: ${repoDetails.description || "N/A"}`}</p>
      <p>
        Link:{" "}
        <a
          href={repoDetails.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repoDetails.name}
        </a>
      </p>
    </div>
  );
}

export default RepositoryDetails;
