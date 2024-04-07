import { useState, useEffect } from "react";
import axios from "axios";

import "../Styles/Table.css";

const API_KEY = "5ef64f1a60mshf414ed93a55afc1p1aff94jsn595f489f163e";

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`; // Ensure this matches the API's expected format

function Table() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchBillboard = async () => {
      const options = {
        method: "GET",
        url: "https://billboard-api5.p.rapidapi.com/api/charts/hot-100",
        params: { date: formattedDate },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "billboard-api5.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        // Adjust this line based on the actual structure of your API response
        console.log(response.data.chart.entries);
        setRankings(response.data.chart.entries || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBillboard();
    console.log(rankings);
  }, []);

  return (
    <div className="mainTableCont">
      <div className="table-responsive">
        <h1>The Billboard Hot100 on {formattedDate}</h1>
        <table className="table overflow-auto table-sm table-element">
          <caption>
            these are the Billboard hot100 top 5 songs for today
          </caption>
          <thead className="tableHeader">
            <tr>
              <th scope="col" id="tableImg">
                Cover
              </th>
              <th scope="col">Ranking</th>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Peak Position</th>
            </tr>
          </thead>
          <tbody>
            {rankings.slice(0, 5).map((song, index) => (
              <tr key={song.rank || index}>
                {" "}
                {/* index is a precaution */}
                <td>
                  <img
                    src={song.cover}
                    alt="Cover"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.position.peakPosition}</td>
                <td>{song.position.weeksOnChart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
