import React from "react";
import Header from "./Header";
import Search from "./Search";
import Trending from "../MovieCategories.tsx/Trending";
import Footer from "./Footer";
import UpComing from "../MovieCategories.tsx/UpComing";
import Popular from "../MovieCategories.tsx/Popular";
import  NowPlaying from "../MovieCategories.tsx/NowPlaying";

const Home = () => {
  return (
    <div className="">
      <Header />
      <Search />
      <div className="h-auto">
        <Trending />
        <NowPlaying/>
        <UpComing/>
        <Popular/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
