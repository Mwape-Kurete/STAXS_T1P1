import "../Styles/Album.css";
import Solange from "../img/Solange - A Seat At the Table (2 LPs) - 2 Vinyl LP _ 08-12-2016 _ Regulier Vinyl.jpeg";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthToken } from "../Data/AUTH";
import Chart_Album from "./Chart_Album";
import { CloseButton } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Album() {
  const [metaItems, setMetaItems] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [singular, setSingular] = useState([]);

  const { authToken } = useAuthToken();

  //storing the first artist array
  // useEffect(() => {
  //   if (metaItems && metaItems.length > 0) {
  //     setSingular(items[0]);
  //   }
  //   console.log(singular);
  // }, [items]);

  //API Call to get artist top tracks details
  // async function getTopTracks() {
  //   const searchParameters = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${authToken}`, // Correctly format the Authorization header
  //     },
  //   };

  //   console.log(
  //     "topTracks page access token successfully rertrieved if " +
  //       authToken +
  //       "is retrieved"
  //   );

  //   try {
  //     const response = await axios.get(
  //       `https://api.spotify.com/v1/artists/${singular}/top-tracks`,
  //       searchParameters // Correctly pass headers as the second argument
  //     );

  //     setItems(response.data); //the above stores the artist results in searchResults
  //     console.log(topTracks);

  //     console.log("token on successful get request: " + useAuthToken);
  //   } catch (error) {
  //     console.log("token on unsuccessful get request: " + authToken);
  //     console.error("Error Searching artist", error);
  //     // Handle error
  //   }
  // }

  return (
    <div className="container-fluid">
      <div className="row">
        {/*Display artist image etc*/}
        {/* <div className="col-12 albmun-timeline-cont">
          {items.map((artist, index) => (
            <div className="album-info justify-content-md-center">
              <div className="close" onClick={() => removeArtist(index)}>
                <CloseButton />
              </div>
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="artist-img"
              />
              <div className="all_album_info" key={artist.id}>
                <h6 id="album-name">{artist.name}</h6>
                <p id="album-year">
                  Album Release year:{" "}
                  <span className="album-meta" id="yearMeta">
                    2016
                  </span>
                </p>
                <p id="album-tracks">
                  Number of tracks:{" "}
                  <span className="album-meta" id="trackMeta">
                    21
                  </span>
                </p>
                <p id="album-length">
                  Length:{" "}
                  <span className="album-meta" id="trackMeta">
                    51
                  </span>{" "}
                  min
                </p>
              </div>
            </div>
          ))}
        </div> */}

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
