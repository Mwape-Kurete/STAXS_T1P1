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
              <div className="col-6 artist">
                <h1>artist 1</h1>
              </div>
              <div className="col-6 artist">
                <h1>artist 2</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
