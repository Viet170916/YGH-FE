import { forwardRef, useEffect, useRef } from "react";

 const Preloader = forwardRef((props, ref) => {
    const boxRef = useRef();
    const box2Ref = useRef();
    const textRef = useRef();
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
        tl.to(textRef.current, { opacity: 0, duration: 0.4 }, "o")
          .to(
            boxRef.current,
            {
                "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.4
            },
            "o"
          )
          .to(boxRef.current, {
              "clip-path": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              duration: 0.4
          })
          .to(textRef.current, { opacity: 1, duration: 0.4 }, "n")
          .to(
            box2Ref.current,
            {
                "clip-path": "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
                duration: 0.4
            },
            "n"
          )
          .to(
            box2Ref.current,
            {
                "clip-path": "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                duration: 0.4
            },
            "m"
          );
    }, []);
    return (
      <div className="preloader" ref={ref}>
          <div className="box">
              <p ref={textRef}>Loading...</p>
              <div className="box-clip" ref={boxRef}></div>
              <div className="box-clip2" ref={box2Ref}></div>
          </div>
      </div>
    );
});
export default Preloader;
