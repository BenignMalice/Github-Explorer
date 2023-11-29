import React from "react";

function UserInfo({ userData }) {
  return (
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
  );
}

export default UserInfo;
