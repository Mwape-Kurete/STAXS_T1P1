import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthToken } from "../Data/AUTH";

import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function Chart_Album() {
  const [activeGraph, setActiveGraph] = useState("genres");

  const filterGraph = (graphId) => {
    setActiveGraph(graphId);
  };

  return (
    <div className="timeline-comp-cont">
      <div className="danceability">
        <div className="row mainTimelineRow">
          <div className="row">
            <div className="col-12 filter-cont">
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
          <div className="col timeline">
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    label: "Daily closing prices AVG. (R)",
                    data: [1500, 2500, 1000, 1700, 2700, 3000],
                    backgroundColor: ["rgba(169, 49, 193, 0.8)"],
                    borderColor: "rgba(169, 49, 193, 1)",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart_Album;
