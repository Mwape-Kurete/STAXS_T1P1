import "../Styles/Searchbar.css";

function Searchbar() {
  return (
    <div className="container-fluid search-cont">
      <div className="row searchbar-row">
        <div className="col-12 search-col">
          <form className="d-flex search-form" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
