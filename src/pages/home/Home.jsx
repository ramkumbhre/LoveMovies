import React from "react";
import "./Home.scss";
import HomePage from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Upcoming from "./upcoming/Upcoming";
const Home = () => {
  return (
    <div className="home-page">
      <HomePage />
      <Trending />
      <Popular />
      <TopRated />
      <Upcoming />
    </div>
  );
};

export default Home;
