import "../Styles/Album.css";
import Solange from "../img/Solange - A Seat At the Table (2 LPs) - 2 Vinyl LP _ 08-12-2016 _ Regulier Vinyl.jpeg";

import React, { useState, useEffect } from "react";
import Chart_Album from "./Chart_Album";
import { CloseButton } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Album() {
  const [artist, setArtist] = useState([]); // Change to manage a single artist object
  const [trackList, setTrackList] = useState([]);
  var artistMeta = [];

  // This effect is for initializing and updating the artist based on local storage
  useEffect(() => {
    const fetchArtist = () => {
      const storedArtist = JSON.parse(localStorage.getItem("selectedArtists"));
      setArtist(storedArtist);

      artistMeta = artist[0];
    };

    // Initialize artist state
    fetchArtist();

    // Setup a manual update method that can be called after changes
    // Note: There's no direct way to watch local storage changes in the same window context
    // So, we expose a method to window for manual calls
    window.updateAlbumArtist = fetchArtist;

    return () => {
      // Cleanup to avoid memory leaks or unintended side effects
      delete window.updateAlbumArtist;
    };
  }, []);

  // Similar setup for trackList
  useEffect(() => {
    const fetchTopTracks = () => {
      const storedTopTracks = JSON.parse(localStorage.getItem("topTracks"));
      setTrackList(storedTopTracks);
    };

    fetchTopTracks();

    window.updateAlbumTopTracks = fetchTopTracks;

    return () => {
      delete window.updateAlbumTopTracks;
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/*Display artist image etc*/}
        {/* <div className="col-12 albmun-timeline-cont">
          {artist[0] && (
            <div className="album-info justify-content-md-center">
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
        </div> */}
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
