import React, { JSX } from "react";
import { Link } from "react-router-dom";
import NavigatorBar from "../../Components/App/NavigatorBar";
import "./AboutUs.scss";
import Duc from "../../Common/Image/Duc.jpg";
import Giang from "../../Common/Image/Giang.jpg";
import Hung from "../../Common/Image/Hung.jpg";
import Loc from "../../Common/Image/Loc.jpg";
import My from "../../Common/Image/My.jpg";
import Viet from "../../Common/Image/Viet.jpg";
interface IProps {}
function AboutUs(props: IProps): JSX.Element {
  return (
    <>
      <NavigatorBar selected="" />
      <div className="about-us">
        <div className="line">
          <div className="info">
            <div className="image">
              <div
                style={{
                  backgroundImage: `url(${My})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div className="name">Mai Thị Trà My</div>
          </div>
          <div className="info">
            <div className="image">
              <div
                style={{
                  backgroundImage: `url(${Viet})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div className="name">Vũ Quốc Việt</div>
          </div>
          <div className="info">
            <div className="image">
              <div
                style={{
                  backgroundImage: `url(${Giang})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div className="name">Trần Hoàng Giang</div>
          </div>
        </div>
        <div className="line">
          <div className="info">
            <div className="image">
              <div
                style={{
                  backgroundImage: `url(${Hung})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div className="name">Lâm Mạnh Hùng</div>
          </div>
          <div className="info">
            <div className="image">
              <div
                style={{
                  backgroundImage: `url(${Duc})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div className="name">Triệu Tiến Đức</div>
          </div>
          <div className="info">
            <div className="image">
              <div
                style={{
                  backgroundImage: `url(${Loc})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
            <div className="name">Nguyễn Bá Lộc</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AboutUs;
