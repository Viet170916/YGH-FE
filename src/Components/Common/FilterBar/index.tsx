  import "./index";
  import React, { JSX } from "react";
  import { AiFillMessage, AiFillPhone } from "react-icons/ai";
  import { BiBookAlt } from "react-icons/bi";
  import { BsCalendar2Day } from "react-icons/bs";
  import { FaChild } from "react-icons/fa6";
  import { HiOutlineLocationMarker } from "react-icons/hi";
  import { IoMdOptions } from "react-icons/io";
  import { LuUsers2 } from "react-icons/lu";
  import { TbBrandFacebookFilled, TbBrandTwitterFilled } from "react-icons/tb";

  interface IProps{

  }
  function index( props: IProps ): JSX.Element{
    return (
      <section className = "app-actions">
        <div className = "app-actions-line">
          <div className = "search-wrapper">
            <button className = "location-btn">
              <HiOutlineLocationMarker className={"btn-icon"}/>
            </button>
            <input type = "text" className = "search-input" value = "San Francisco, Stockton Street" />
            <button className = "search-btn">Find Hotel</button>
          </div>
          <div className = "contact-actions-wrapper">
            <div className = "contact-actions">
              <span>Contact us: </span>
              <a href = "src/Components/Common/FilterBar#" className = "contact-link">
                <AiFillPhone className={"btn-icon"}/>
              </a>
              <a href = "src/Components/Common/FilterBar#" className = "contact-link">
                <AiFillMessage className={"btn-icon"}/>
              </a>
            </div>
            <div className = "contact-actions socials">
              <span>Follow us: </span>
              <a href = "src/Components/Common/FilterBar#" className = "contact-link facebook">
                <TbBrandFacebookFilled className={"btn-icon"}/>
              </a>
              <a href = "src/Components/Common/FilterBar#" className = "contact-link">
                <TbBrandTwitterFilled className={"btn-icon"}/>
              </a>
            </div>
          </div>
        </div>
        <div className = "app-actions-line filter-line">
          <div className = "filter-action-buttons">
            <button className = "filter-btn">
              <div className = "filter-icon">
                <BsCalendar2Day className={"btn-icon"}/>
              </div>
              <span className = "filter-text">Sat,Nov 10-Fri,Nov 22</span>
            </button>
            <button className = "filter-btn">
              <div className = "filter-icon">
                <BiBookAlt className={"btn-icon"}/>
              </div>
              <span className = "filter-text">Rooms - 2</span>
            </button>
            <button className = "filter-btn">
              <div className = "filter-icon">
                <LuUsers2 className={"btn-icon"}/>
              </div>
              <span className = "filter-text">Adults - 2</span>
            </button>
            <button className = "filter-btn">
              <div className = "filter-icon">
                <FaChild className={"btn-icon"}/>
              </div>
              <span className = "filter-text">Child - 1</span>
            </button>
            <button className = "filter-btn more">
              <div className = "filter-icon">
                <IoMdOptions className={"btn-icon"}/>
              </div>
              <span className = "filter-text">More</span>
            </button>
          </div>
        </div>
      </section>
    );
  }
  export default index;

