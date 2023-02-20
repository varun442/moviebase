import React from "react";
// Header CSS in index.js
import logo from "../assets/WatchMe_logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

import { VscClose } from "react-icons/vsc";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchBox = (e) => {
    e.preventDefault();
    setSearchBoxOpen(!searchBoxOpen);
  };
  const handleMobileMenu = (e) => {
    e.preventDefault();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query !== "") {
      navigate(`/search?query=${query}`, { replace: true });
    }
  };
  console.log(pathname);
  return (
    <header
      className={`${
        pathname !== "/movies" &&
        pathname !== "/register" &&
        pathname !== "/search" &&
        pathname !== "/signin" &&
        pathname !== "/tv"
          ? "absolute"
          : "relative"
      }`}
    >
      <div className="container">
        <div className="nav">
          <div className="nav-header">
            <div className="nav-title">
              <div className="logo">
                <Link to="/">
                  <img width="100%" src={logo} alt="logo" />
                </Link>
              </div>
            </div>
          </div>
          <div className={`nav-search-box ${searchBoxOpen ? "open" : ""}`}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  placeholder="Search for movies"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
                <button className="btn search-btn" type="submit">
                  Search
                </button>
                <button onClick={searchBox} className="close-btn">
                  <VscClose />
                </button>
              </div>
            </form>
          </div>
          <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            <ul>
              {mobileMenuOpen && (
                <li>
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
              )}

              <li onClick={() => setMobileMenuOpen(false)}>
                <NavLink to="/movies" className="nav-link">
                  Movies
                </NavLink>
              </li>

              <li onClick={() => setMobileMenuOpen(false)}>
                <NavLink to="/tv" className="nav-link">
                  Tv Shows
                </NavLink>
              </li>

              <li onClick={() => setMobileMenuOpen(false)}>
                <NavLink to="/signin" className="nav-link">
                  SignIn
                </NavLink>
              </li>

              <li onClick={() => setMobileMenuOpen(false)}>
                <NavLink to="/register" className="nav-link">
                  <button className="btn">Register</button>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="nav-btn">
            <button onClick={searchBox} className="close-btn">
              <BsSearch />
            </button>
            {mobileMenuOpen ? (
              <button onClick={handleMobileMenu} className="close-btn">
                <VscClose />
              </button>
            ) : (
              <button onClick={handleMobileMenu} className="menu-btn">
                <AiOutlineMenu style={{ fontSize: "20px" }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
