import React, { useEffect, useRef } from "react";
import Link from "next/link";

import { i18n } from "next-i18next";
import { useSession } from "next-auth/react";
import { useCart } from "hooks/useCart";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const { cartItems, addToCart } = useCart();
  const numberOfCartItems = cartItems.length;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark style-15 p-0">
      <div className="container content">
        <Link className="navbar-brand cursor-pointer" href="/">
          <div className="navbar-brand">
            <img src="/assets/img/logo_15.png" alt="" />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          style={{ justifyContent: "right" }}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 ps-4">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                {i18n.t("home")}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/education" className="nav-link">
                {i18n.t("education_title")}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/blog" className="nav-link">
                {i18n.t("blog_menu_title")}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/partners" className="nav-link">
                {i18n.t("partners_title")}
              </Link>
            </li>
          </ul>
          <div className="nav-side">
            <div className="dropdown">
              {sessionData?.user?.email ? (
                <button className="dropbtn" style={{ marginRight: "10px" }}>
                  <i className="fas fa-user"></i>
                </button>
              ) : (
                <button className="dropbtn_unauth">
                  <p>
                    {i18n.t("login_title")}/{i18n.t("register")}
                  </p>
                </button>
              )}
              <div className="dropdown-content">
                {sessionData?.user?.email && (
                  <Link href="/profile">{i18n.t("profile_title")}</Link>
                )}
                {!sessionData?.user?.email && (
                  <Link href="/login" className="nav-link">
                    {i18n.t("login_title")}
                  </Link>
                )}
                {!sessionData?.user?.email && (
                  <Link href="/register" className="nav-link">
                    {i18n.t("register")}
                  </Link>
                )}
                {sessionData?.user?.email && (
                  <Link href="/logout" className="nav-link">
                    {i18n.t("logout_title")}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="nav-side">
            <Link href="/cart" className="btn rounded-pill fw-bold cart">
              <i className="fas fa-shopping-cart cart_icon"></i>
              <span className="cart_item_count">{numberOfCartItems}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
