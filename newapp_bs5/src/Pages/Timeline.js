import Sidebar from "../Components/Sidebar";
import Searchbar from "../Components/Searchbar";
import Album from "../Components/Album";
import "../Styles/Timeline.css";

function Timeline() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 sidebar-col">
          <Sidebar /> {/* calling the sidebar component*/}
        </div>
        <div className="col justify-content-md-center">
          <div className="row">
            <div className="col-12 searchbar">
              <Searchbar /> {/* calling the search component*/}
            </div>

            <div className="mainTimelinecont">
              {/*album timeline goes below*/}
              <Album />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
