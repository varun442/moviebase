import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
console.log(process.env);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/tv" element={<Tv />} />
      <Route path="/tv/:id" element={<TvDetails />} />
      <Route path="/news" element={<News />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="terms-conditions" element={<TermsCondition />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
