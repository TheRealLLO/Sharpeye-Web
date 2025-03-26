import React from "react";
import { i18n } from "next-i18next";
const Footer = () => {
  return (
    <footer className="style-15">
      <div className="container">
        <div
          className="footer-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px 0",
          }}
        >
          <div>
            <div>
              <img
                style={{ width: 200 }}
                src="/assets/img/logo_15.png"
                alt=""
              />
            </div>
          </div>

          <div>
            <h6 style={{ textTransform: "capitalize" }} className="sub-title">
              {" "}
              {i18n.t("footer_us")}{" "}
            </h6>
            <div className="main-links">
              <ul>
                <li
                  style={{
                    width: "50%",
                  }}
                >
                  {" "}
                  <a href={"#partner"}>{i18n.t("partners")} </a>{" "}
                </li>

                <li
                  style={{
                    width: "50%",
                  }}
                >
                  {" "}
                  <a href={"#privillages"}>{i18n.t("privillages")} </a>{" "}
                </li>
                <li
                  style={{
                    width: "50%",
                  }}
                >
                  {" "}
                  <a href={"#benefits"}>{i18n.t("footer_benefits")} </a>{" "}
                </li>
                <li
                  style={{
                    width: "50%",
                  }}
                >
                  {" "}
                  <a href={"#cryptocurrency"}>
                    {i18n.t("footer_cryptocurrency")}{" "}
                  </a>{" "}
                </li>
                <li
                  style={{
                    width: "50%",
                  }}
                >
                  {" "}
                  <a href={"#about"}>{i18n.t("footer_about")} </a>{" "}
                </li>
                <li
                  style={{
                    width: "50%",
                  }}
                >
                  {" "}
                  <a href={"#faq"}>FAQ </a>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div
            style={{
              maxWidth: "250px",
            }}
          >
            <h6 style={{ textTransform: "capitalize" }} className="sub-title">
              {" "}
              {i18n.t("footer_contact")}{" "}
            </h6>
            <div className="links">
              <ul>
                <li>
                  {" "}
                  <i className="fab fa-twitter color-red2 me-2"></i>{" "}
                  <a href="https://twitter.com/SharpEyeTrading">
                    @SharpEyeTrading
                  </a>
                </li>
                <li>
                  {" "}
                  <i className="fas fa-envelope-open color-red2 me-2"></i>{" "}
                  <a href="mailto:info@sharpeyetrading.com">
                    {" "}
                    info@sharpeyetrading.com{" "}
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="foot">
          <p>
            {" "}
            <a href="#" className="text-white">
              {" "}
              SharpEye Trading{" "}
            </a>{" "}
            {i18n.t("footer_copyright")}{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
