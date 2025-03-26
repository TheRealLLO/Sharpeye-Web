import React from "react";

import { i18n } from "next-i18next";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Features = (lang) => {
  const { data: sessionData } = useSession();
  return (
    <section id="privillages" className="features style-15">
      <div className="container">
        <div className="section-head text-center mb-50 wow fadeInUp">
          <h2 className="fs-1"> {i18n.t("privillages")} </h2>
        </div>
        <div className="content">
          <div
            className="row featuresContainer"
            style={{
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              <Link
                href={"/dao"}
                className="features-card wow fadeInUp"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="icon">
                  <img src="/assets/img/icons/features/29.png" alt="" />
                </div>
                <h6>DAO</h6>
                <p>{i18n.t("dao_home_subtitle")}</p>
              </Link>
            </div>

            <div
              style={{
                flex: 1,
              }}
            >
              <Link
                href={"/traderoom"}
                className="features-card wow fadeInUp"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="icon">
                  <img src="/assets/img/icons/features/28.png" alt="" />
                </div>
                <h6> {i18n.t("traderoom_title")}</h6>
                <p> {i18n.t("traderoom_home_subtitle")}</p>
              </Link>
            </div>

            <div
              style={{
                flex: 1,
              }}
            >
              <Link
                href={"/education"}
                className="features-card wow fadeInUp"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="icon">
                  <img src="/assets/img/icons/features/30.png" alt="" />
                </div>
                <h6> {i18n.t("education_title")}</h6>
                <p> {i18n.t("education_home_subtitle")}</p>
              </Link>
            </div>

            {/* <div className="col-lg-3">
              <a href="#" className="features-card wow fadeInUp">
                <div className="icon">
                  <img src="/assets/img/icons/features/14.png" alt="" />
                </div>
                <h6>Copy Trade</h6>
                <p> {i18n.t('copy_trade_home_subtitle')}</p>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
