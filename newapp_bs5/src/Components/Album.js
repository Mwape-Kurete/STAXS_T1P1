import "../Styles/Album.css";
import Solange from "../img/Solange - A Seat At the Table (2 LPs) - 2 Vinyl LP _ 08-12-2016 _ Regulier Vinyl.jpeg";
import Linegraph from "./charts/Linegraph";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Album() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 albmun-timeline-cont">
          <div className="album-info justify-content-md-center">
            <img className="album-cover" id="albumCover" src={Solange} alt="" />
            <div className="all_album_info">
              <h6 id="album-name">A Seat at the table</h6>
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
        </div>
        <div className="col-12 timeline-cont">
          <div className="row">
            <div className="col timeline">
              <Linegraph />
            </div>
            <div className="col-2 filters">
              <div className="col-12 comp-filter">
                <div
                  class="btn-group-vertical"
                  role="group"
                  aria-label="Vertical radio toggle button group"
                >
                  <input
                    type="radio"
                    class="btn-check"
                    name="vbtn-radio"
                    id="vbtn-radio1"
                    autocomplete="off"
                    checked
                  />
                  <label class="btn btn-outline-light" for="vbtn-radio1">
                    Radio 1
                  </label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="vbtn-radio"
                    id="vbtn-radio2"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-light" for="vbtn-radio2">
                    Radio 2
                  </label>
                  <input
                    type="radio"
                    class="btn-check"
                    name="vbtn-radio"
                    id="vbtn-radio3"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-light" for="vbtn-radio3">
                    Radio 3
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Album;
