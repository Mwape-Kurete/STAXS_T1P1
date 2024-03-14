import { useState, useEffect } from "react";
import axios from "axios";

function GetArtist() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg")
      .then((response) => {
        //handle success
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        //handle error
        console.log(error);
      });
  }, []);
}

export default GetArtist;
