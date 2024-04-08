import "../Styles/Album.css";
import Solange from "../img/Solange - A Seat At the Table (2 LPs) - 2 Vinyl LP _ 08-12-2016 _ Regulier Vinyl.jpeg";

import React, { useState, useEffect } from "react";
import Chart_Album from "./Chart_Album";
import { CloseButton } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Album() {
  const [artist, setArtist] = useState(null); // Change to manage a single artist object
  const [trackList, setTrackList] = useState([]);

  // Modify updateLocalStorage to handle a single artist object
  const updateLocalStorage = (newData) => {
    localStorage.setItem("selectedArtists", JSON.stringify(newData)); // Assumes newData is an object or null
    window.dispatchEvent(new CustomEvent("localDataUpdated"));
  };

  // Adjust useEffect to fetch and set a single artist from local storage
  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedArtist = JSON.parse(
        localStorage.getItem("selectedArtists") || "null"
      ); // Expecting a single object or null
      if (JSON.stringify(storedArtist) !== JSON.stringify(artist)) {
        setArtist(storedArtist); // Directly set the single artist object
      }
    }, 1000); // Every 1000 milliseconds

    return () => clearInterval(intervalId);
  }, [artist]); // Dependency on the single artist object

  // Adjust removeArtist to clear the selected artist
  const removeArtist = () => {
    setArtist(null); // Clear the selected artist
    localStorage.setItem("selectedArtists", JSON.stringify(null)); // Store null to indicate no selected artist
  };

  // Adjust how you handle artist selection to replace the existing artist
  const selectArtist = (newArtist) => {
    setArtist(newArtist); // Set the new artist, replacing any previous selection
    updateLocalStorage(newArtist); // Update local storage with the new selection
  };

  useEffect(() => {
    // Fetch topTracks from local storage
    const storedTopTracks = JSON.parse(
      localStorage.getItem("topTracks") || "[]"
    );
    setTrackList(storedTopTracks);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const handleStorageUpdate = (event) => {
      if (event.key === "topTracks") {
        const updatedTopTracks = JSON.parse(event.newValue || "[]");
        setTrackList(updatedTopTracks);
      }
    };

    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/*Display artist image etc*/}
        <div className="col-12 albmun-timeline-cont">
          {artist && (
            <div className="album-info justify-content-md-center">
              <div className="close" onClick={() => removeArtist}>
                <CloseButton />
              </div>
              <img
                src={artist.images?.[0]?.url ?? Solange}
                alt={artist.name}
                className="artist-img"
              />
              <div className="all_album_info" key={artist.id}>
                <p id="album-year">
                  You are viewing the top tracks for:{" "}
                  <span className="album-meta" id="yearMeta">
                    {artist.name}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="col-12 top-track-names">
          <p>
            <a
              className="btn btn-primary"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              show top tracks
            </a>
          </p>
          <div className="collapse" id="collapseExample">
            <div className="card card-body overflow-auto">
              {/* Render search results */}
              {trackList.length > 0 && (
                <div className="search-results-dropdown">
                  {trackList.map((tracks) => (
                    <span className="badge badge-results" key={tracks.id}>
                      {tracks.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 timeline-cont">
          <div className="row">
            {/* place chart album component here */}
            <Chart_Album />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Album;
