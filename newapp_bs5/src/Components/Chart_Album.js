import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthToken } from "../Data/AUTH";

import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function Chart_Album() {
  const [activeGraph, setActiveGraph] = useState("genres");
  const [tracksArr, setTracksArr] = useState([]);
  const [tracksIDs, setTracksIDs] = useState("");
  const [trackProps, setTrackProps] = useState([]);

  const { authToken } = useAuthToken();

  useEffect(() => {
    const storedTopTracksArr = JSON.parse(
      localStorage.getItem("topTracks") || "[]"
    );
    setTracksArr(storedTopTracksArr);

    // Fetch audio features for stored track IDs
    const trackIDs = storedTopTracksArr.map((track) => track.id).join(",");
    fetchAudioFeatures(trackIDs);
  }, [authToken]);

  // useEffect(() => {
  //   const trackIDs = tracksArr.map((track) => track.id).join(",");
  //   setTracksIDs(trackIDs);
  // }, [tracksArr]);

  async function fetchAudioFeatures(trackIDs) {
    if (!trackIDs) return;
    const url = `https://api.spotify.com/v1/audio-features?ids=${trackIDs}`;
    const searchParams = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await axios.get(url, searchParams);
      console.log(response.data); // Log the response data
      const featuresByTrackId = response.data.audio_features.reduce(
        (acc, feature) => {
          acc[feature.id] = feature;
          return acc;
        },
        {}
      );

      setTrackProps(featuresByTrackId);
    } catch (error) {
      console.error("Error fetching audio features", error);
    }
  }

  // fetchAudioFeatures(tracksIDs); // not needed

  const filterGraph = (graphId) => {
    setActiveGraph(graphId);
  };

  // Prepare data for the currently active graph
  const graphData = {
    labels: tracksArr.map((track) => track.name),
    datasets: [
      {
        label: activeGraph.charAt(0).toUpperCase() + activeGraph.slice(1), // Capitalize the activeGraph label
        data: tracksArr.map((track) =>
          trackProps[track.id] ? trackProps[track.id][activeGraph] : 0
        ),
        backgroundColor: "rgb(255, 107, 97)",
        borderColor: "rgb(172, 224, 51)",
      },
    ],
  }; // Re-run when tracksIDs or authToken changes

  useEffect(() => {
    const handleStorageUpdate = (event) => {
      if (event.key === "topTracks") {
        const updatedTopTracksArr = JSON.parse(event.newValue || "[]");
        setTracksArr(updatedTopTracksArr);
      }
    };

    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

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
                  id="danceability"
                  autoComplete="off"
                  checked={activeGraph === "danceability"}
                  onChange={() => filterGraph("danceability")}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="danceability"
                >
                  Danceability
                </label>

                <input
                  type="radio"
                  className="btn-check radioBTN"
                  name="btnradio"
                  id="speechiness"
                  checked={activeGraph === "speechiness"}
                  onChange={() => filterGraph("speechiness")}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="speechiness"
                >
                  Speechiness
                </label>

                <input
                  type="radio"
                  className="btn-check radioBTN"
                  name="btnradio"
                  id="tempo"
                  checked={activeGraph === "tempo"}
                  onChange={() => filterGraph("tempo")}
                />
                <label className="btn btn-outline-primary" htmlFor="tempo">
                  Tempo
                </label>

                <input
                  type="radio"
                  className="btn-check radioBTN"
                  name="btnradio"
                  id="instrumentalness"
                  checked={activeGraph === "instrumentalness"}
                  onChange={() => filterGraph("instrumentalness")}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="instrumentalness"
                >
                  Instrumentalness
                </label>

                <input
                  type="radio"
                  className="btn-check radioBTN"
                  name="btnradio"
                  id="liveness"
                  checked={activeGraph === "liveness"}
                  onChange={() => filterGraph("liveness")}
                />
                <label className="btn btn-outline-primary" htmlFor="liveness">
                  Liveness
                </label>
              </div>
            </div>
          </div>
          <div className="col timeline">
            <Line
              data={graphData}
              options={{ scales: { y: { beginAtZero: true } } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart_Album;
