import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthToken } from "../Data/AUTH";

import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function Chart_Album() {
  const [activeGraph, setActiveGraph] = useState("danceability");
  const [tracksArr, setTracksArr] = useState([]);
  const [tracksIDs, setTracksIDs] = useState("");
  const [trackProps, setTrackProps] = useState([]);

  const { authToken } = useAuthToken();

  // This effect handles updating tracks array from local storage
  useEffect(() => {
    const fetchTopTracks = () => {
      const storedTopTracksArr = JSON.parse(
        localStorage.getItem("topTracks") || "[]"
      );
      setTracksArr(storedTopTracksArr);
    };

    fetchTopTracks();

    // Expose method to window for manual update calls
    window.updateChartAlbumTracks = fetchTopTracks;

    return () => {
      // Ensure to clean up to avoid memory leaks
      delete window.updateChartAlbumTracks;
    };
  }, []);

  // This effect triggers fetching audio features when tracksArr updates
  useEffect(() => {
    const fetchAudioFeatures = async (trackIDs) => {
      if (!trackIDs) return;
      const url = `https://api.spotify.com/v1/audio-features?ids=${trackIDs}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      try {
        const response = await axios.get(url, { headers });
        // Simplify data structure for easier use in rendering
        const featuresIndexedById = response.data.audio_features.reduce(
          (acc, cur) => {
            acc[cur.id] = cur;
            return acc;
          },
          {}
        );

        setTrackProps(featuresIndexedById);
      } catch (error) {
        console.error("Error fetching audio features", error);
      }
    };

    const trackIDs = tracksArr.map((track) => track.id).join(",");
    fetchAudioFeatures(trackIDs);
  }, [tracksArr, authToken]);

  const filterGraph = (graphId) => {
    setActiveGraph(graphId);
  };

  // Prepare data for the currently active graph this is done for brevity so that the html of the application is more simple ad less redundant
  const graphData = {
    labels: tracksArr.map((track) => track.name),
    datasets: [
      {
        //activee graph function is called to ensure that the filters correspond to what the graph displays
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
