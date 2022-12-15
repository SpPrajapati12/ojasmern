import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import Query from "./components/query";
import Footer from "./components/footer/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/login/index";
import UserDetails from "./components/userDetails";

function App() {
  useEffect(() => {
    //  random()
  });
  //   const random = () => {
  //     var precision = 100; // 2 decimals
  // var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
  //     console.log(randomnum)
  //   }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/userDetails" element={<UserDetails />} />
          <Route exact path="/userDetails" element={<UserDetails />} />
        </Routes>
        <Query />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
