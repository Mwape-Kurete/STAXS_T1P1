import "./Cards.css";
import graph1 from "./img/Group 15.svg";
import graph2 from "./img/Group 16.svg";
import graph3 from "./img/Group 17.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Cards() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="card card01">
            <img className="img-responsive" src={graph1} alt="graph1" />
            <div className="card-body">
              <h5 className="card-title">Compare Artists</h5>
              <p className="card-text">
                Select 2 Artists and compare their monthly listeners
              </p>
              <a href="#" className="btn btn-dark">
                Comapare Artists
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card02">
            <img className="img-responsive" src={graph2} alt="graph2" />
            <div className="card-body">
              <h5 className="card-title">View Album Stats</h5>
              <p className="card-text">
                View all the stats behind your favourite albums
              </p>
              <a href="#" className="btn btn-dark">
                View Album Stats
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card card03">
            <img className="img-responsive" src={graph3} alt="graph3" />
            <div className="card-body">
              <h5 className="card-title">Compare Top Tracks</h5>
              <p className="card-text">
                Compare Your Artists Top Tracks against other artists
              </p>
              <a href="#" className="btn btn-dark">
                Compare Top Tracks
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
