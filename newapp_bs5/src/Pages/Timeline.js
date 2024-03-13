import Sidebar from "../Components/Sidebar";
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
            <div className="col-12">
              <div className="album-info">
                <img className="album-cover" id="albumCover" src="" alt="" />
                <h1 id="album-name">A Seat at the table</h1>
                <h3 id="album-year">
                  Album Release year{" "}
                  <span className="album-meta" id="yearMeta">
                    2017
                  </span>
                </h3>
                <h3 id="album-tracks">
                  Number of tracks
                  <span className="album-meta" id="trackMeta">
                    2017
                  </span>
                </h3>
              </div>
            </div>
            <div className="col-12 timeline-cont">
              <div className="filters"></div>
              <p>timelines Go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
