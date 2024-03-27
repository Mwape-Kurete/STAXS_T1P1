import axios from "axios";
import { useEffect, useState } from "react";

var client_id = "6dfe161492d14a558bea14512386b896";
var client_secret = "7d449a9084ca46b2a30397b3d9ad11c8";

// const response = await axios.post(
//   "https://accounts.spotify.com/api/token",
// new URLSearchParams({
//   grant_type: "client_credentials",
//   client_id: client_id,
//   client_secret: client_secret,
// })
// );

async function AUTH() {
  //   const response = await axios.get(
  //     "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
  //     {
  //       headers: {
  //         Authorization: `Bearer  ${data.access_token}`,
  //       },
  //     }
  //   );

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: client_id,
          client_secret: client_secret,
        })
      )
      .then((response) => {
        axios.get("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
}

export default AUTH;
