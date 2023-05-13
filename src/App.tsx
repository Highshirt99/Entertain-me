import React from "react";
import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import TV from "./components/TV";
import TvDetails from "./components/TvDetails";

function App() {
  return (
    <div className="min-h-screen bg-darkBlue font-bodyFont relative">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path = "/movies" element = {<Movies/>} />
        <Route path = "/tv" element = {<TV/>} />
        <Route path="/tv/:id" element={<TvDetails />} />
      </Routes>
    </div>
  );
}

export default App;
