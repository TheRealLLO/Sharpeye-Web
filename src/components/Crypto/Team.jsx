import React from "react";
import Link from "next/link";
import { i18n } from "next-i18next";
const Team = () => {
  return (
    <>
      <section id="about" className="team style-15">
        <div className="container ekip">
          <div className="section-head text-center mb-50 wow fadeInUp">
            <h2 className="fs-1"> {i18n.t("team")}</h2>
          </div>
          <div
            className="team-index"
            style={{ display: "flex", flexDirection: "row", gap: "80px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
              className="row gx-0"
            >
              <div className="team-card wow fadeInUp ">
                <div className="teamimg">
                  <img src="/assets/img/oguz.jpg" alt="" />
                </div>
                <div className="info">
                  <div className="social-icons">
                    <a href="https://twitter.com/LaikLaikoglu">
                      {" "}
                      <i className="fab fa-twitter"></i>{" "}
                    </a>
                  </div>
                  <div className="inf">
                    <p className="text-uppercase"> {i18n.t("co_founder")} </p>
                    <h5> Oğuz </h5>
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "justify",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <p>{i18n.t("oguz").substring(0, 158)}...</p>
                <Link
                  href="/aboutus/#oguz"
                  style={{ color: "#39AA35", cursor: "pointer" }}
                >
                  {i18n.t("read_more")}
                </Link>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
              className="row gx-0"
            >
              <div className="team-card wow fadeInUp ">
                <div className="teamimg">
                  <img src="/assets/img/ata.jpg" alt="" />
                </div>
                <div className="info">
                  <div className="social-icons">
                    <a href="https://twitter.com/AtaPaykoc">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                  <div className="inf">
                    <p className="text-uppercase"> {i18n.t("co_founder")} </p>
                    <h5> Ata </h5>
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "justify",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <p>{i18n.t("ata").substring(0, 154)}...</p>
                <Link
                  href="/aboutus/#ata"
                  style={{ color: "#39AA35", cursor: "pointer" }}
                >
                  {i18n.t("read_more")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
