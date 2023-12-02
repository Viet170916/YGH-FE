import { useEffect } from "react";
import Parallax from "parallax-js";
import "./ErrorPage.scss";

export default function ErrorPage() {
  useEffect(() => {
    const scene = document.getElementById("scene");
    if (scene) {
      const parallax = new Parallax(scene);
    }
  }, []);

  return (
    <div className={"error-page-container"}>
      <nav>
        <div className="menu">
          <h1
            className="website_name"
            onClick={() => window.location.replace("/")}
            onKeyDown={() => {}}
          >
            Yuugen
          </h1>

          <div className="menu_icon">
            <span className="icon"></span>
          </div>
        </div>
      </nav>
      <section className="wrapper">
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>

            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">
              404
            </p>
            <p className="p404" data-depth="0.10">
              404
            </p>
          </div>

          <div className="text">
            <article>
              <p>
                Uh oh! Looks like you got lost. <br />
                Go back to the homepage if you dare!
              </p>
              <button onClick={() => window.location.replace("/")}>
                i dare!
              </button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
