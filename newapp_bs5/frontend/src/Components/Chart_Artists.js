import { useState, useEffect } from "react";
import "../Styles/ChartGraphs.css";
import axios from "axios";
import { useAuthToken } from "../Data/AUTH";

import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";

function Chart_Artists() {
  const [artist, setArtist] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { authToken } = useAuthToken();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedArtists = JSON.parse(
        localStorage.getItem("selectedArtists") || "[]"
      );
      if (JSON.stringify(storedArtists) !== JSON.stringify(artist)) {
        setArtist(storedArtists);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [artist]);

  //get artist artists
  async function topTracks() {
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
        `
        https://api.spotify.com/v1/artists/${artist.id}/albums`,
        searchParameters // Correctly pass headers as the second argument
      );
      setAlbums(response.data); //the above stores the artist results in ALBUMS

      console.log("the artist ID is: " + response.data);

      console.log("token on successful get request: " + authToken);
    } catch (error) {
      console.log("token on unsuccessful get request: " + authToken);
      console.error("Error Searching artist", error);
    }
  }

  const [activeGraph, setActiveGraph] = useState("genres");

  const filterGraph = (graphId) => {
    setActiveGraph(graphId);
  };

  return (
    <div className="graph-cont">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 comp-filter">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check radioBTN"
                name="btnradio"
                id="genres"
                autoComplete="off"
                checked={activeGraph === "genres"}
                onChange={() => filterGraph("genres")}
              />
              <label className="btn btn-outline-primary" for="genres">
                Genres
              </label>

              <input
                type="radio"
                className="btn-check radioBTN"
                name="btnradio"
                id="followers"
                checked={activeGraph === "followers"}
                onChange={() => filterGraph("followers")}
              />
              <label className="btn btn-outline-primary" for="followers">
                Followers
              </label>

              <input
                type="radio"
                className="btn-check radioBTN"
                name="btnradio"
                id="popular"
                checked={activeGraph === "popular"}
                onChange={() => filterGraph("popular")}
              />
              <label className="btn btn-outline-primary" for="popular">
                Popularity
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 comp-graph justify-content-center">
          <div className="artist-graph">
            {activeGraph === "genres" && (
              <div className="genres">
                <PolarArea
                  data={{
                    labels: artist.map((data) => data.name),
                    datasets: [
                      {
                        label: "total Genres",
                        data: artist.map((data) => data.genres.length),
                        backgroundColor: [
                          "rgb(255, 107, 97)",
                          "rgb(172, 224, 51)",
                        ],
                        borderRadius: 2.5,
                      },
                    ],
                  }}
                />
              </div>
            )}
            {activeGraph === "popular" && (
              <div className="popularity">
                <Doughnut
                  data={{
                    labels: artist.map((data) => data.name),
                    datasets: [
                      {
                        label: "Popularity /100",
                        data: artist.map((data) => data.popularity),
                        backgroundColor: [
                          "rgb(255, 107, 97)",
                          "rgb(172, 224, 51)",
                        ],
                      },
                    ],
                  }}
                />
              </div>
            )}
            {activeGraph === "followers" && (
              <div className="followers">
                <Bar
                  data={{
                    labels: artist.map((data) => data.name),
                    datasets: [
                      {
                        label: "followers",
                        data: artist.map((data) => data.followers.total),
                        backgroundColor: [
                          "rgb(255, 107, 97)",
                          "rgb(172, 224, 51)",
                        ],
                        borderRadius: 2.5,
                      },
                    ],
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart_Artists;
