import Sidebar from "../Components/Sidebar";
import "../Styles/Timeline.css";

function Timeline() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 sidebar-col">
          <Sidebar />
        </div>
        <div className="col justify-content-md-center">
          <h1>No code here yet</h1>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
