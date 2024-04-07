import { useState, useEffect } from "react";
import "../Styles/ChartGraphs.css";
import axios from "axios";

import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";

function Chart_Artists() {
  const [artist, setArtist] = useState([]);
  const [albums, setAlbums] = useState([]);

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
              <label class="btn btn-outline-primary" for="Followers">
                Followers
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="polar"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="polar">
                Popularity
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 comp-graph justify-content-center">
          <div className="artist-graph">
            {/* <div className="popularity" hidden>
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
            </div> */}
            <div className="bargraph">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart_Artists;
