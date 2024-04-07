import { useState, useEffect } from "react";
import "../Styles/ChartGraphs.css";
import axios from "axios";

function Chart_Artists() {
  const [artist, setArtist] = useState([]);

  //the following code ensures that my search bar is appropriatley updated

  const updateLocalStorage = (newData) => {
    localStorage.setArtist("selectedArtists", JSON.stringify(newData));
    window.dispatchEvent(new CustomEvent("localDataUpdated"));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedArtists = JSON.parse(
        localStorage.getItem("selectedArtists") || "[]"
      );
      // Only update if there are changes
      if (JSON.stringify(storedArtists) !== JSON.stringify(artist)) {
        setArtist(storedArtists);
      }
    }, 1000); // Every 1000 milliseconds

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
