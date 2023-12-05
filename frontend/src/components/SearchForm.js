import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

// Functional component for handling user searches
function SearchForm({ username, setUsername, handleSearch, loading }) {
  return (
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
  );
}

export default SearchForm;
