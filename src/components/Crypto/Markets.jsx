import React from "react";
import { useState, useEffect } from "react";
import liste from "/public/assets/json/sharpeye_liste.json";
import { i18n } from "next-i18next";
const Markets = () => {
  let sayi = 4;
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    liste.forEach((element, index) => {
      liste[index].user_id = Number(
        liste[index].user_id.toString().slice(0, 13)
      );
    });

    if (liste.length <= sayi) {
      sayi = liste.length;
      document.getElementById("loadmorediv").style.display = "none";
      setDataList(liste.slice(0, liste.length));
    } else {
      setDataList(liste.slice(0, sayi));
    }
  }, []);

  const loadMore = (e) => {
    e.preventDefault();

    if (sayi === liste.length) {
      document.getElementById("loadmorediv").style.display = "none";
    } else if (sayi < liste.length) {
      sayi += 4;
      setDataList(liste.slice(0, sayi));
    }
    if (liste.length <= sayi) {
      sayi = liste.length;
      document.getElementById("loadmorediv").style.display = "none";
      setDataList(liste.slice(0, sayi));
    }
  };

  return (
    <section id="cryptocurrency" className="markets section-padding style-15">
      <div className="container">
        <div className="section-head text-center mb-70 wow fadeInUp">
          {/* <h6 className="text-uppercase fw-bold lh-8"> <img src="/assets/img/icons/home_15_icon.png" alt="" className="icon-30 me-2" />  <span> exchnage </span>  <img src="/assets/img/icons/home_15_icon.png" alt="" className="icon-30 ms-2" /> </h6> */}
          <h2 className="fs-1"> {i18n.t("paid_back_commissions")} </h2>
        </div>
        <div className="content">
          <div className="markets-table">
            <div
              className="table-head wow fadeInUp"
              style={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {i18n.t("user_id")}
                </p>
              </div>
              {/* <div style={{
              flex: 1}}>
                <p> {i18n.t("deposit")} </p>
              </div> */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {i18n.t("transaction_fee")}{" "}
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {i18n.t("total_commission")}
                </p>
              </div>
            </div>
            <div className="table-body">
              {dataList.map((row, idx) => (
                <div
                  className="body-row wow fadeInUp"
                  key={idx}
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    className="item"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p className="text-white-50">
                      {" "}
                      <strong className="text-white text-uppercase">
                        {" "}
                        <span className="hide-on-mobile"> {row.user_id}</span>
                        *****{" "}
                      </strong>{" "}
                    </p>
                  </div>
                  {/* <div className="item">
                    <p className="text-white-50">
                      {" "}
                      <strong className="text-white me-1">
                        {" "}
                        {row.yatirilan_usdt}{" "}
                      </strong>{" "}
                      /USDT{" "}
                    </p>
                  </div> */}
                  <div
                    className="item"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      className={
                        Math.sign(row.islem_ucreti_usdt) === 1
                          ? "per-up"
                          : "color-red-crypto"
                      }
                    >
                      {" "}
                      {row.islem_ucreti_usdt}
                    </p>
                  </div>
                  <div
                    className="item"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      className="text-white w-100"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      <strong>
                        {" "}
                        {Math.sign(row.toplam_komisyon_usdt) === 1 ? "" : "-"} $
                        {Math.abs(row.toplam_komisyon_usdt).toFixed(5)}{" "}
                      </strong>{" "}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="loadmorediv" className="text-center wow fadeInUp">
            <a
              onClick={loadMore}
              href="#0"
              className="btn rounded-pill bg-red2 fw-bold text-white mt-40"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                {" "}
                {i18n.t("show_more")}{" "}
                <i className="fal fa-long-arrow-down ms-2"></i>{" "}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;
