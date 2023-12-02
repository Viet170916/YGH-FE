import { ForwardedRef, forwardRef, LegacyRef, useEffect, useRef } from "react";

const Navbar = forwardRef((props,ref) => {
 // const ref = useRef();
    useEffect(() => {
        let theme = window.localStorage.getItem("theme");
        if (theme === "light" ) {
            ref["current"]["dataset"]["theme"] = 'light'
        }
        if (theme === "dark" ) {
            ref["current"]["dataset"]["theme"] = "dark"
        }
    })

    const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const offset = 200
        const targetId = e.currentTarget.getAttribute('href')?.substring(1)
        const targetElement = document.getElementById(targetId || '')

        if (targetElement) {
            console.log(targetElement.offsetTop)
            const scrollOffset = targetElement.offsetTop - offset; //center the content to avoid the menu bar
            window.scrollTo({
                top: scrollOffset,
                behavior: 'smooth',
            });
        }
    };

    const toggleNav = () => {
        ref.current.dataset.expanded === "false" ? ref.current.dataset.expanded = 'true' : ref.current.dataset.expanded = 'false'
        ref.current.dataset.expanded === "true" ? gsap.fromTo(ref.current, { height: "88.8px" }, { height: "100%", duration: 0.40 }) : gsap.to(ref.current, { height: "88.8px", duration: 0.40 });
    }
    return (
        <header>
            <nav className="navbar background-blur" ref={ref} data-test='component-navbar' data-theme="light" data-expanded='false'>
                <button className="navbar-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav}>
                    <span className="toggle-bar"></span>
                    <span className="toggle-bar"></span>
                    <span className="toggle-bar"></span>
                </button>
                <div className="brand">
                    <a href="/">Yuugen</a>
                </div>
                <div className="nav-center">
                    <ul>
                        <li><a className="nav-item" href="#amenities-section" onClick={handleScrollToSection}>Amenities</a></li>
                        <li><a className="nav-item" href="#apartment-section" onClick={handleScrollToSection}>Apartments</a></li>
                        <li><a className="nav-item" href="#" onClick={handleScrollToSection}>Policies</a></li>
                        <li><a className="nav-item" href="#" onClick={handleScrollToSection}>Reviews</a></li>

                    </ul>
                </div>
                <div className="nav-right">
                    <a className="nav-item" href="/#">Contact</a>
                </div>
            </nav>
        </header>
    )
});
export default Navbar;
