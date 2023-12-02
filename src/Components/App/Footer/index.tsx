import { JSX } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

interface IProps{
}
function Footer( props: IProps ): JSX.Element{
  return (
    <footer className = "site-footer">
      <div className = "container">
        <div className = "row row1">
          <div className = "col-sm-12 col-md-6">
            <h6>About</h6>
            <p className = "text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.
            </p>
          </div>
          <div className = "col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className = "footer-links">
              <li><Link to = "/templates">Templates</Link></li>
            </ul>
          </div>
          <div className = "col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className = "footer-links">
              <li><Link to = "/about-us">About Us</Link></li>
              <li><Link to = "/contact">Contact Us</Link></li>
              <li><Link to = "/">Contribute</Link></li>
              <li><Link to = "/policy">Privacy Policy</Link></li>
              <li><Link to = "/sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className = "container">
        <div className = "row">
          <div className = "col-md-8 col-sm-6 col-xs-12">
            <p className = "copyright-text">Copyright &copy; 2017 All Rights Reserved by
              <Link to = "#">Scanfcode</Link>.
            </p>
          </div>
          <div className = "col-md-4 col-sm-6 col-xs-12">
            <ul className = "social-icons">
              <li><Link className = "facebook" to = "#"><i className = "fa fa-facebook"></i></Link></li>
              <li><Link className = "twitter" to = "#"><i className = "fa fa-twitter"></i></Link></li>
              <li><Link className = "dribbble" to = "#"><i className = "fa fa-dribbble"></i></Link></li>
              <li><Link className = "linkedin" to = "#"><i className = "fa fa-linkedin"></i></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>);
}
export default Footer;
