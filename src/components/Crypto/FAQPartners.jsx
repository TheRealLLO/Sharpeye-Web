import Link from "next/link";
import React from "react";
import useSize from "../../hooks/useSize";

import { i18n } from "next-i18next";

const FAQPartners = (lang) => {

  const windowSize = useSize();
  const windowWidth = windowSize[0];
  return (
    <section id="faq" className="faq pt-100 style-15">
      <div className="container">
        <div className="section-head text-center mb-50 wow fadeInUp">
          <h2 className="fs-1"> {i18n.t("frequently_asked_questions")}</h2>
        </div>
        <div className="row" style={{display: "flex", flexDirection: "column"}}>
          <div className="col-lg-6" style={{width: windowWidth.toString() + "px"}}>
            <div className="faq-card wow fadeInUp">
              <span className="numb">1</span>
              <div className="info">
                <h6> Question 1 </h6>
                <p> Answer 1 </p>
              </div>
              <img
                src="/assets/img/icons/faq_15_icon.png"
                alt=""
                className="icon"
              />
            </div>
          </div>

          <div className="col-lg-6" style={{width: windowWidth.toString() + "px"}}>
            <div className="faq-card wow fadeInUp">
              <span className="numb">2</span>
              <div className="info">
                <h6> Question 2 </h6>
                <p> Answer 2 </p>
              </div>
              <img
                src="/assets/img/icons/faq_15_icon.png"
                alt=""
                className="icon"
              />
            </div>
          </div>

          <div className="col-lg-6" style={{width: windowWidth.toString() + "px"}}>
            <div className="faq-card wow fadeInUp">
              <span className="numb">3</span>
              <div className="info">
                <h6> Question 3 </h6>
                <p> Answer 3 </p>
              </div>
              <img
                src="/assets/img/icons/faq_15_icon.png"
                alt=""
                className="icon"
              />
            </div>
          </div>
        </div>
        <div
          style={{ marginBottom: "40px" }}
          className="text-center mt-50 wow fadeInUp"
        >
          <Link
            href="/contact"
            className="butn border-1 brd-light border rounded-pill text-white hover-red2"
          >
            <span>
              {" "}
              {i18n.t("ask_more_question")}{" "}
              <i className="fal fa-long-arrow-right ms-2"></i>{" "}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQPartners;
