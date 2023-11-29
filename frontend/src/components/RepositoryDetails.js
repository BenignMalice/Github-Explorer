import React from "react";

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
