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
        url: "https://billboard-api2.p.rapidapi.com/hot-100",
        params: { date: formattedDate, range: "1-10" },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "billboard-api2.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        // Adjust this line based on the actual structure of your API response
        console.log(response.data.content);
        setRankings(response.data.content || []);

        console.log(rankings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBillboard();
  }, []);

  return (
    <div className="mainTableCont">
      <div className="table-responsive">
        <h1>The Billboard Hot100 on {formattedDate}</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
              <th scope="col">Last week</th>
              <th scope="col">Peak Position</th>
              <th scope="col">Weeks on Chart</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rankings) &&
              rankings.map((song, index) => (
                <tr key={index}>
                  <td>{song.rank}</td>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.last_week}</td>
                  <td>{song.peak_position}</td>
                  <td>{song.weeks_on_chart}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
