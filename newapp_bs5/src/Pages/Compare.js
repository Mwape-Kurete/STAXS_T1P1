import Sidebar from "../Components/Sidebar";
import Searchbar from "../Components/Searchbar";
import Artist from "../Components/Artist";

import "../Styles/Compare.css";

//main compare page

function Compare() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 sidebar-col">
          <Sidebar /> {/* calling the sidebar component*/}
        </div>
        <div className="col justify-content-md-center page-content">
          <div className="row">
            <div className="col-12 searchbar">
              <Searchbar /> {/* calling the search component*/}
            </div>
            {/* Artist Comparison goes Below */}
            <div className="row comparisons">
              <div className="col artist">
                <div className="content">
                  <Artist /> {/* calling the artist component*/}
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
