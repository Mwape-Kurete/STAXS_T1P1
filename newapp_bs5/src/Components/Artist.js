import "../Styles/Artists.css";
import Temp1 from "../img/6838e615-ab19-49fe-89c8-efbe6964f2bf.jpeg";

function Artist() {
  return (
    <div className="artistContainer">
      <div className="container-fluid artist-card ">
        <div className="row">
          <div className="col-12">
            <img src={Temp1} alt="artist" className="artist-img" />
            <div className="artist-metaData">
              <h6>
                Artist{" "}
                <span id="artistName" className="artist-name">
                  King Krule
                </span>
              </h6>
            </div>
          </div>
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
          <div className="col-12 comp-graph">
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
