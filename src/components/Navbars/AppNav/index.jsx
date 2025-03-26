import Link from "next/link";

const Navbar = ({ navbarRef }) => {
  const handleMouseMove = (event) => {
    const dropDownToggler = event.target.classList.contains("dropdown-toggle")
      ? event.target
      : event.target.querySelector(".dropdown-toggle");
    const dropDownMenu = dropDownToggler?.nextElementSibling;

    dropDownToggler?.classList?.add("show");
    dropDownMenu?.classList?.add("show");
  };

  const handleMouseLeave = (event) => {
    const dropdown = event.target.classList.contains("dropdown")
      ? event.target
      : event.target.closest(".dropdown");
    const dropDownToggler = dropdown.querySelector(".dropdown-toggle");
    const dropDownMenu = dropdown.querySelector(".dropdown-menu");

    dropDownToggler?.classList?.remove("show");
    dropDownMenu?.classList?.remove("show");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light style-4"
      ref={navbarRef}
    >
      <div className="container">
        <Link className="navbar-brand" href="/">
          <div className="navbar-brand">
            <img src="/assets/img/logo_lgr.png" alt="" />
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-uppercase">
            <li
              className="nav-item dropdown"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className="nav-link active dropdown-toggle"
                href="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Homes
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li>
                  <Link href="/" className="dropdown-item">
                    Landing Preview
                  </Link>
                </li>
                <li>
                  <Link href="/home-it-solutions2" className="dropdown-item">
                    Creative It Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/home-data-analysis" className="dropdown-item">
                    Data Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/home-app-landing" className="dropdown-item">
                    App Landing
                  </Link>
                </li>
                <li>
                  <Link href="/home-saas-technology" className="dropdown-item">
                    Saas Technology
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home-marketing-startup"
                    className="dropdown-item"
                  >
                    Marketing Startup
                  </Link>
                </li>
                <li>
                  <Link href="/home-it-solutions" className="dropdown-item">
                    It Solution
                  </Link>
                </li>
                <li>
                  <Link href="/home-software-company" className="dropdown-item">
                    Software Company
                  </Link>
                </li>
                <li>
                  <Link href="/home-digital-agency" className="dropdown-item">
                    Digital Agency
                  </Link>
                </li>
                <li>
                  <Link href="/home-modren-shop" className="dropdown-item">
                    Modren Shop
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className="nav-item dropdown"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                pages
                <small className="hot alert-danger text-danger">hot</small>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li>
                  <Link href="/page-about-app" className="dropdown-item">
                    about
                  </Link>
                </li>
                <li>
                  <Link href="/page-product-app" className="dropdown-item">
                    product
                  </Link>
                </li>
                <li>
                  <Link href="/page-services-app" className="dropdown-item">
                    services
                  </Link>
                </li>
                <li>
                  <Link href="/page-shop-app" className="dropdown-item">
                    shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/page-single-project-app"
                    className="dropdown-item"
                  >
                    single project
                  </Link>
                </li>
                <li>
                  <Link href="/page-single-post-app" className="dropdown-item">
                    single post
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/page-portfolio-app" className="nav-link">
                portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-blog-app" className="nav-link">
                blog
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-contact-app" className="nav-link">
                <img
                  src="/assets/img/icons/nav_icon/price.png"
                  alt=""
                  className="icon-15 me-2"
                />
                contact
              </Link>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <a href="#" className="search-icon me-4">
                <i className="bi bi-person"></i>
              </a>
              <Link
                href="/page-contact-app"
                className="btn rounded-pill brd-gray hover-blue4 sm-butn fw-bold"
              >
                <span>
                  Join iteck Hub <i className="bi bi-arrow-right ms-1"></i>{" "}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
