import { useEffect } from "react";

const Toggle = () => {
    const getTheme = ( string?: string ) => {
        return window.localStorage.getItem( "theme" ) === string;
    };
    const setTheme = () => {
        if( getTheme( "dark" ) ){
            gsap.set( ":root", {
                "--bg-color": "#211f1f",
                "--text-color-alt": "#FFF",
                duration: 0.32,
            } );
            // set toggle position depending on theme state
            gsap.set( ".theme-toggle span", { x: 12 } );
        }else{
            window.localStorage.setItem( "theme", "light" );
        }
    };
    const toggleTheme = () => {
        if( getTheme( "" ) || getTheme( "light" ) ){
            gsap.to( ":root", {
                "--bg-color": "#211f1f",
                "--text-color-alt": "#FFF",
                duration: 0.32,
            } );
            gsap.to( ".theme-toggle span", { x: 12, duration: 0.24 } );
            window.localStorage.setItem( "theme", "dark" );
        }else{
            gsap.to( ":root", {
                "--bg-color": "#FFF",
                "--text-color-alt": "#000",
                "--grey": "#808080",
            } );
            gsap.to( ".theme-toggle span", { x: 0, duration: 0.24 } );
            window.localStorage.setItem( "theme", "light" );
        }
    };
    useEffect( () => {
        getTheme();
        setTheme();
    } );
    return (
      <button
        role = "switch"
        aria-checked = "true"
        className = "theme-toggle"
        onClick = { toggleTheme }
      >
          <span></span>
      </button>
    );
};

export default Toggle;
