import { useState, useEffect } from "react";
import "../Styles/ChartGraphs.css";
import axios from "axios";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const TARGET_URL = "https://songstats.p.rapidapi.com/artists/stats";

function Chart_Artists() {
  const [artist, setArtist] = useState([]);
  const [artistStats, setArtistStats] = useState([]);

  const API_KEY_STATS = "141d636a64msh40818e52ee62873p1316a2jsn43263d1809f7";

  const artistID = [];

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

  // const getArtistID = () => {
  //   artist.forEach((artistData) => {
  //     artistID.push(artistData.id);
  //   });

  //   console.log("artist ID: " + artistID);
  // };

  // getArtistID();
  useEffect(() => {
    const fetchArtistStats = async () => {
      if (artist.length === 0) return; // Exit if there are no artists to fetch

      const requests = artist.slice(0, 2).map((artistData) => {
        // Limit to the first two artists to prevent 429 errors
        return axios
          .get(`${PROXY_URL}${TARGET_URL}`, {
            params: { source: "spotify", spotify_artist_id: artistData.id },
            headers: {
              "X-RapidAPI-Key": API_KEY_STATS,
              "X-RapidAPI-Host": "songstats.p.rapidapi.com",
            },
          })
          .then((response) => ({ success: true, data: response.data }))
          .catch((error) => ({ success: false, error: error.toString() }));
      });

      try {
        const results = await Promise.all(requests);
        setArtistStats(
          results
            .filter((result) => result.success)
            .map((result) => result.data)
        );
      } catch (error) {
        console.error("Error fetching artist stats", error);
      }
    };

    fetchArtistStats();
  }, [artist]); // Depend on artist array to re-run

  return (
    <div className="graph-cont">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 comp-filter">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="PieChart"
                autocomplete="off"
                checked
              />
              <label class="btn btn-outline-primary" for="PieChart">
                Pie Chart
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="barChart"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="barChart">
                Bar Chart
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="polar"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="polar">
                Polar Area
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 comp-graph justify-content-center">
          <div className="artist-graph">
            <h1>artist graphs go here</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart_Artists;
