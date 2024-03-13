import Sidebar from "../Components/Sidebar";
import Searchbar from "../Components/Searchbar";
import Solange from "../img/Solange - A Seat At the Table (2 LPs) - 2 Vinyl LP _ 08-12-2016 _ Regulier Vinyl.jpeg";
import "../Styles/Timeline.css";

function Timeline() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 sidebar-col">
          <Sidebar />
        </div>
        <div className="col justify-content-md-center">
          <div className="row">
            <div className="col-12 searchbar">
              <Searchbar />
            </div>
            {/*album timeline goes below*/}
            <div className="col-12 albmun-timeline-cont">
              <div className="album-info justify-content-md-center">
                <img
                  className="album-cover"
                  id="albumCover"
                  src={Solange}
                  alt=""
                />
                <div className="all_album_info">
                  <h6 id="album-name">A Seat at the table</h6>
                  <p id="album-year">
                    Album Release year:{" "}
                    <span className="album-meta" id="yearMeta">
                      2017
                    </span>
                  </p>
                  <p id="album-tracks">
                    Number of tracks:{" "}
                    <span className="album-meta" id="trackMeta">
                      2017
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 timeline-cont">
              <div className="row">
                <div className="col timeline">
                  <p>timelines Go here</p>
                </div>
                <div className="col-2 filters">
                  <p>filters go here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
