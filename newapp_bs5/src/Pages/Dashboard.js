import Sidebar from "../Components/Sidebar.js";
import Cards from "../Components/Cards.js";
import "../Styles/Dashboard.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AUTH from "../Data/AUTH.js";

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
              Compare All Stats From Your Favourite Artists, Tracks and Albums.
            </h5>
            <p className="dash-txt">
              Explore music effortlessly with our website. Using Chart.js and
              Spotify's Web API, we offer dynamic comparisons of artists,
              tracks, and albums. Discover trends, popularity, and emerging
              talents in today's music scene with intuitive data visualizations.
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
