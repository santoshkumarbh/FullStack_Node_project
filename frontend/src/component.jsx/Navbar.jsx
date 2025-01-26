import React from "react";



const Navbar = ({ name, handleDelete }) => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#662671" }}>
      <div className="container-fluid">
        {/* Brand name */}
        <h3 className="navbar-brand fw-bold text-white" >
          Table Sprint
        </h3>
       

        {/* Toggle button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ color: "white" }}></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <span className="nav-link active text-white h5">{name}</span>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-danger ms-3"
                onClick={handleDelete}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </div>
  );
};

export default Navbar;
