import React, { useEffect } from "react";
import TopNav from "@components/Navbars/TopNav-15";
import Navbar from "@components/Navbars/CryptoNav";
import "animate.css";

import { i18n } from "next-i18next";

const Header = (lang) => {
  return (
    <header className="style-15">
      <div className="navs-container">
        <TopNav />
        <Navbar />
      </div>
      <div className="container">
        <div className="content">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="info">
                <h6 className="home-title">{i18n.t("home_title")}</h6>
                <h6 style={headerText}>{i18n.t("home_subtitle")}</h6>
                <a
                  href="https://discord.gg/sharpeyetrading"
                  className="butn bg-yellowGreen text-dark fw-bold rounded-pill"
                >
                  <span>
                    {" "}
                    <i className="fab fa-discord me-2"></i>{" "}
                    {i18n.t("join_discord")}{" "}
                  </span>
                </a>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="img text-center">
                <img src="/assets/img/header/hero-section-img.png " alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const headerText = {
  fontSize: "15px",
  lineHeight: "2.0",
  textTransform: "none",
  fontWeight: 300,
};
