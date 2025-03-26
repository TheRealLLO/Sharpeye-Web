import React from "react";
import { i18n } from "next-i18next";
const About = (lang) => {
  return (
    <section id="benefits" className="about style-15 section-padding">
      <div className="container">
        <div className="row align-items-start justify-content-between">
          <div className="col-lg-5">
            <div className="info wow fadeInUp">
              <div className="section-head mb-30">
                <h2 className="fs-1"> {i18n.t("commissions_headline")} </h2>
              </div>
              <p> {i18n.t("commissions_subline")} </p>
              <ul>
                <li style={liStyle}>
                  <i className="fal fa-check me-3 color-red2"></i>{" "}
                  <span>{i18n.t("commissions_1")} </span>{" "}
                </li>

                <li style={liStyle}>
                  <i className="fal fa-check me-3 color-red2"></i>{" "}
                  <span>{i18n.t("commissions_2")} </span>{" "}
                </li>
              </ul>
              {/* <a
                href="#0"
                className="btn rounded-pill bg-red2 fw-bold text-white mt-40"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  {" "}
                  {i18n.t("register")}{" "}
                  <i className="fal fa-angle-down ms-2"></i>{" "}
                </span>
              </a> */}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="container">
              <div id="partner" className="countdown-content wow fadeInUp">
                <div className="section-head text-center mb-70 wow fadeInUp">
                  <h2 className="fs-1"> {i18n.t("partners")} </h2>
                </div>
                <div
                  className="logos"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: "30px",
                    gap: "40px",
                  }}
                >
                  <div className="features-card wow fadeInUp ">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.okx.com/join/SHARPEYE30"
                    >
                      <img
                        style={{ width: "100px" }}
                        src="/assets/img/logos/OKX-logo-white.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="features-card wow fadeInUp ">
                    <a
                      href="https://bingx.com/invite/L5GPE8AA"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        style={{
                          width: "100px",
                          
                        }}
                        src="/assets/img/logos/bingx-bw.png"
                        alt=""
                      />
                    </a>
                  </div>
                  {/* <div className="features-card wow fadeInUp ">
                    <a
                      href="https://partner.bybit.com/b/22608"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        style={{ width: "100px" }}
                        src="/assets/img/logos/Bybit_Logotype_Darkmode-Mono.png"
                        alt=""
                      />
                    </a>
                  </div> */}
                </div>
                <div
                  className="logos"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: "30px",
                    gap: "40px",
                  }}
                >
                  {/* <div className="features-card wow fadeInUp ">
                    <a
                      href="https://www.mexc.com/tr-TR/register?inviteCode=mexc-1ecE8"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        style={{ width: "100px" }}
                        src="/assets/img/logos/mexc-bw.png"
                        alt=""
                      />
                    </a>
                  </div> */}
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

const liStyle = {
  display: "flex",
  flexDirection: "row",
};
