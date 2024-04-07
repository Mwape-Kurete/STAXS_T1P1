import { useState, useEffect } from "react";
import "../Styles/ChartGraphs.css";
import axios from "axios";

function Chart_Artists() {
  const [artist, setArtist] = useState([]);
  const API_KEY_STATS = "5ef64f1a60mshf414ed93a55afc1p1aff94jsn595f489f163e";
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

  const getArtistID = () => {
    artist.forEach((artistData) => {
      artistID.push(artistData.id);
    });

    console.log("artist ID: " + artistID);
  };

  getArtistID();

  useEffect(() => {
    const getArtistStats = async () => {
      //checking the array has data to loop through
      if (artist.length === 0) return;

      const artistIDs = artist.map((a) => a.id).slice(0, 2); // ensures that only the first 2 objects are read
      const requests = artistIDs.map((id) => {
        const options = {
          method: "GET",
          url: "https://songstats.p.rapidapi.com/artists/info",
          params: {
            spotify_artist_id: id,
          },
          headers: {
            "X-RapidAPI-Key": API_KEY_STATS,
            "X-RapidAPI-Host": "songstats.p.rapidapi.com",
          },
        };
        return axios.request(options);
      });
      try {
        const responses = await Promise.all(requests);
        // Process responses here
        console.log(responses.map((response) => response.data)); // Example of logging out each response data
      } catch (error) {
        console.error("Failed to fetch artist stats:", error);
      }
    };
    getArtistStats();
  }, [artist]);

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
