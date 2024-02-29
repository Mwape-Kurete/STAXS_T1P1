import "./Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar() {
  return (
    <div className="container-fluid ">
      <div className="row row-sidebar">
        <div className="col-auto col-md-3 min-vh-100 d-flex justify-content-between flex-column sidebar_menu">
          <div>
            <a className="text-decoration-none text-white d-flex align-itemcenter">
              <i className="bi bi-speedometer"></i>
              <span className="ms-1">Brand</span>
            </a>
            <hr className="text-secondary" />
            <ul class="nav nav-pills flex-column ">
              <li class="nav-item text-white my-1">
                <a href="#" class="nav-link current">
                  <i className="bi bi-speedometer2"></i>
                  <span className="ms-2">Dashboard</span>
                </a>
              </li>
              <li class="nav-item text-white my-1">
                <a href="#" class="nav-link">
                  <i className="bi bi-pie-chart"></i>
                  <span className="ms-2">Compare</span>
                </a>
              </li>
              <li class="nav-item text-white my-1">
                <a href="#" class="nav-link">
                  <i className="bi bi-graph-up"></i>
                  <span className="ms-2">Timeline</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
