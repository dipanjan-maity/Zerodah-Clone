import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("zerodhaUser")),
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("zerodhaUser")));
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("zerodhaUser");
    window.dispatchEvent(new Event("auth-change"));
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav
      class="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div class="container p-2">
        <Link class="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <ul class="navbar-nav mb-lg-0">
              <li className="nav-item">
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="nav-link active btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link className="nav-link active" to="/signup">
                    Signup
                  </Link>
                )}
              </li>
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/about">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to="/products"
                >
                  Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/support">
                  Support
                </Link>
              </li>
              <li className="nav-item ms-3">
                <button
                  type="button"
                  className="nav-link p-0 btn btn-link"
                  aria-label="Menu"
                >
                  <i
                    className="fa-solid fa-bars"
                    style={{ fontSize: "22px", marginTop: "7px" }}
                  ></i>
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
