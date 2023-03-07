import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Register,
  SignIn,
  Error,
  Home,
  MovieDetails,
  Movies,
  News,
  Privacy,
  Search,
  TermsCondition,
  Tv,
  TvDetails,
} from "./pages";
import Footer from "./components/Footer";
import Header from "./components/Header";
const App = () => {
  const location = useLocation();
  console.log(process.env);
  return (
    <>
      {location.pathname === "/register" || location.pathname === "/signin" ? (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/tv/:id" element={<TvDetails />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<Error />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          <Footer />
        </>
      )}
      {/* {location.pathname === "/register" && (
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
      {location.pathname === "/signin" && (
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      )} */}
    </>
  );
};

export default App;
