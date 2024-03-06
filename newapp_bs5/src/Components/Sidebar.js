// importing styles and images
import "../Styles/Sidebar.css";
import logo from "../img/logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    //start of sidebar nav section
    <div className="container-fluid ">
      <div className="row row-sidebar">
        <div className="col-auto col-md-3 min-vh-100 d-flex justify-content-between flex-column sidebar_menu">
          <div>
            {/* Logo and website name */}
            <div className="text-decoration-none text-white d-flex align-itemcenter logo-cont">
              <img className="img-responsive logo-svg" src={logo} alt="logo" />
              <span className="ms-1 logo">STAXS</span>
            </div>

            <hr className="text-secondary" />

            {/* Nav links below */}
            <ul class="nav nav-pills flex-column ">
              <li class="nav-item text-white my-1">
                <Link to="/" class="nav-link current">
                  <i className="bi bi-speedometer2"></i>
                  <span className="ms-2">Dashboard</span>
                </Link>
              </li>
              <li class="nav-item text-white my-1">
                <Link to="/Compare" class="nav-link">
                  <i className="bi bi-pie-chart"></i>
                  <span className="ms-2">Compare</span>
                </Link>
              </li>
              <li class="nav-item text-white my-1">
                <Link to="/Timeline" class="nav-link">
                  <i className="bi bi-graph-up"></i>
                  <span className="ms-2">Timeline</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
