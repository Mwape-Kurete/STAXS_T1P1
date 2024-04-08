import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs"; // Import qs for query string parsing
import "../Styles/Searchbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useAuthToken } from "../Data/AUTH";

// It's recommended to use environment variables for sensitive data
// For local development, you might need to prefix these with REACT_APP_
// const CLIENT_ID = "6dfe161492d14a558bea14512386b896";
// const CLIENT_SECRET = "7d449a9084ca46b2a30397b3d9ad11c8";
// const REDIRECT_URI = "http://localhost:3000/callback"; //this is to aid in creating a refresh token
// var access_token = "";

function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const [topTracks, setTopTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  const { authToken } = useAuthToken();

  //var [refreshToken, setRefreshToken] = useState("");

  // useEffect(() => {
  //   const data = qs.stringify({ grant_type: "client_credentials" });
  //   //const refresh_data = qs.stringify({ grant_type: "refresh_token" }); // Include the refresh token
  //   const headers = {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`, // Base64 encode client ID and client secret
  //   };

  //   axios
  //     .post("https://accounts.spotify.com/api/token", data, { headers })
  //     .then((response) => {
  //       //setAccessToken(response.data.access_token); // saving the access token
  //       access_token = response.data.access_token;

  //       console.log(response.data); // Here you would typically store the access token in the state or context

  //       console.log("the stored token is: " + access_token);
  //     })

  //     .catch((error) =>
  //       console.error("Error fetching the access token:", error)
  //     );

  //   // Axios POST request to refresh the access token using the refresh token
  // }, []);

  //Search --> NEEDS TO BE ASYNC BECAUSE OF MULTIPLE FETCH FUNCTIONS

  async function search() {
    console.log("searching for " + searchInput); // testing search input
    console.log(authToken);
    // Artist ID -> get request using search to get Artist ID
    const searchParameters = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Correctly format the Authorization header
      },
    };

    console.log("token before get request: " + authToken);
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchInput
        )}&type=artist`,
        searchParameters // Correctly pass headers as the second argument
      );
      setSearchResults(response.data.artists.items); //the above stores the artist results in searchResults
      const firstArtistID = response.data.artists.items[0].id;
      console.log("the artist ID is: " + response);

      getTopTracks(firstArtistID);

      console.log("token on successful get request: " + useAuthToken);
    } catch (error) {
      console.log("token on unsuccessful get request: " + authToken);
      console.error("Error Searching artist", error);
      // Handle error
    }
  }

  async function getTopTracks(artistID) {
    if (!artistID) return;

    const searchParams = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Correctly format the Authorization header
      },
    };

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`, // Added a market query parameter
        searchParams
      );

      setTopTracks(response.data.tracks);
      localStorage.setItem("topTracks", JSON.stringify(response.data.tracks));

      console.log("Top tracks fetched and stored for artist ID:", artistID);
    } catch (error) {
      console.error(
        "Error fetching top tracks for artist ID:",
        artistID,
        error
      );
    }

    console.log(topTracks);
  }

  // Toggle an artist's selection state
  const toggleSelectedArtist = (artist) => {
    const isSelected = selectedArtists.some(
      (selected) => selected.id === artist.id
    );

    getTopTracks(artist.id);

    let newSelectedArtists;
    if (isSelected) {
      // Artist is already selected, remove them
      newSelectedArtists = selectedArtists.filter(
        (selected) => selected.id !== artist.id
      );
    } else {
      // Add the artist to the selection if we have less than 2 artists selected
      if (selectedArtists.length < 2) {
        newSelectedArtists = [...selectedArtists, artist];
      } else {
        // Optionally handle the case where there are already 2 artists selected
        alert("Maximum of 2 artists can be selected.");
        return; // Early return if we're not changing the selection
      }
    }
    // Update state and local storage
    setSelectedArtists(newSelectedArtists);
    localStorage.setItem("selectedArtists", JSON.stringify(newSelectedArtists));
  };

  console.log(selectedArtists);

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
        <div className="col-12 results-col">
          <p>
            <a
              className="btn btn-primary"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              show search results
            </a>
          </p>
          <div className="collapse" id="collapseExample">
            <div className="card card-body overflow-auto">
              {/* Render search results */}
              {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  {searchResults.map((artist) => (
                    <span
                      className="badge badge-results"
                      key={artist.id}
                      onClick={() => toggleSelectedArtist(artist)}
                    >
                      {artist.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Display selected artists */}
          {selectedArtists.length > 0 && (
            <div className="selected-artists">
              <h4>Selected Artists:</h4>
              {selectedArtists.map((artist) => (
                <span
                  className="badge rounded-pill badge-selected"
                  key={artist.id}
                  onClick={() => toggleSelectedArtist(artist)}
                >
                  {artist.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
