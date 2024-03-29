import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs"; // Import qs for query string parsing
import "../Styles/Searchbar.css"; // Make sure the path to your CSS file is correct

// It's recommended to use environment variables for sensitive data
// For local development, you might need to prefix these with REACT_APP_
const CLIENT_ID = "6dfe161492d14a558bea14512386b896";
const CLIENT_SECRET = "7d449a9084ca46b2a30397b3d9ad11c8";

function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const data = qs.stringify({ grant_type: "client_credentials" });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`, // Base64 encode client ID and client secret
    };

    axios
      .post("https://accounts.spotify.com/api/token", data, { headers })
      .then((response) => {
        setAccessToken(response.data.access_token); // Here you would typically store the access token in the state or context
      })

      .catch((error) =>
        console.error("Error fetching the access token:", error)
      );
  }, []);

  //Search
  async function search() {
    console.log("searching for " + searchInput);
  }

  return (
    <div className="container-fluid search-cont">
      <div className="row searchbar-row">
        <div className="col-12 search-col">
          <form
            className="d-flex search-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={searchInput}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  search();
                  // Here you can call the function to search with the input value
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={() => {
                search();
                // Here you can call the function to search with the input value
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
