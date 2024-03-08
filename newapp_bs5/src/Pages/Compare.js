import Sidebar from "../Components/Sidebar";
import Searchbar from "../Components/Searchbar";
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
                  <div className="artist-card">
                    <h1>artist card goes here</h1>
                  </div>
                  <hr />
                  <div className="artist-graph">
                    <h1>artist graphs go here</h1>
                  </div>
                </div>
              </div>
              <div className="col artist">
                <div className="content">
                  <div className="artist-card">
                    <h1>artist card goes here</h1>
                  </div>
                  <hr />
                  <div className="artist-graph">
                    <h1>artist graphs go here</h1>
                  </div>
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
