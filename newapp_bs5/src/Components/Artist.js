import React, { useState, useEffect } from "react";
import "../Styles/Artists.css";
import Temp1 from "../img/6838e615-ab19-49fe-89c8-efbe6964f2bf.jpeg";
import { CloseButton } from "react-bootstrap";

function Artist() {
  const [items, setItems] = useState([]);

  //the following code ensures that my search bar is appropriatley updated

  const updateLocalStorage = (newData) => {
    localStorage.setItem("selectedArtists", JSON.stringify(newData));
    window.dispatchEvent(new CustomEvent("localDataUpdated"));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedArtists = JSON.parse(
        localStorage.getItem("selectedArtists") || "[]"
      );
      // Only update if there are changes
      if (JSON.stringify(storedArtists) !== JSON.stringify(items)) {
        setItems(storedArtists);
      }
    }, 1000); // Every 1000 milliseconds

    return () => clearInterval(intervalId);
  }, [items]);

  // below we remove an artist based on when the close button is pressed
  const removeArtist = (index) => {
    const newItems = items.filter((item, idx) => idx !== index);
    setItems(newItems);
    localStorage.setItem("selectedArtists", JSON.stringify(newItems));
  };

  return (
    <div className="artistContainer">
      <div className="container-fluid artist-card">
        <div className="row">
          {items.map((artist, index) => (
            <div className="col-6" key={artist.id}>
              <div className="close" onClick={() => removeArtist(index)}>
                <CloseButton />
              </div>
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="artist-img"
              />
              <div className="artist-metaData">
                <h6>
                  Artist: <span className="artist-name">{artist.name}</span>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
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
    </div>
  );
}

export default Artist;
