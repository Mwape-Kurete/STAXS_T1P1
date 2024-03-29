import Sidebar from "../Components/Sidebar";
import Searchbar from "../Components/Searchbar";
import Artist from "../Components/Artist";

import "../Styles/Compare.css";

function Compare() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 sidebar-col">
          <Sidebar />
        </div>
        <div className="col justify-content-md-center page-content">
          <div className="row">
            <div className="col-12 searchbar">
              <Searchbar />
            </div>
            {/* Artist Comparison goes Below */}
            <div className="row comparisons">
              <div className="col artist">
                <div className="content">
                  <Artist />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
