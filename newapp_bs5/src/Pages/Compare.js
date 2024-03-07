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
        <div className="col justify-content-md-center">
          <Searchbar />
          <h1>No code here yet</h1>
        </div>
      </div>
    </div>
  );
}

export default Compare;
