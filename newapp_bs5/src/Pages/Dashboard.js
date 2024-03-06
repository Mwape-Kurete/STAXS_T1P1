import Sidebar from "./Sidebar.js";
import Cards from "./Cards.js";
import "./Dashboard.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Dashboard() {
  return (
    <div className="container-fluid dash-cont">
      {/* Dashboard Page Starts Here */}
      <div className="row">
        {/* below is the sidebar section */}
        <div className="col-2 sidebar-col">
          <Sidebar />
        </div>
        {/* below is the main page content */}
        <div className="col justify-content-md-center">
          <div className="hero-section">
            <h1 className="dash-header">Welcome To Staxs</h1>
            <h5>
              Comapre All Stats From Your Favourite Artists, Tracks and Albums
            </h5>
            <p className="dash-txt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              modi obcaecati sapiente libero commodi dicta perferendis! Odit,
              eos. Eveniet unde, quas cum vitae ducimus libero expedita cumque
              ipsa natus. Voluptates!
            </p>
          </div>

          {/* Below is the Card section */}
          <div className="row row-card-car">
            <div className="col-12">
              <div className="card-scroller">
                <Cards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
