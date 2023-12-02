import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ROLE from "../Common/Enum/Role";
import Footer from "../Components/App/Footer";
import NavigatorBar from "../Components/App/NavigatorBar";
import AboutUs from "../Layouts/AboutUs/AboutUs";
import BookingLayout from "../Layouts/Booking/BookingLayout";
import ChangePassword from "../Layouts/ChangePassword/ChangePassword";
import CreatePost from '../Layouts/Dashboard/ContentDisplayer/CreatePost/CreatePost';
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Home from "../Layouts/Home/Home";
import Login from "../Layouts/Auth/Login/Login";
// import SignIn from "../Layouts/SignIn/SignIn";
import PaymentConfirm from "../Layouts/PaymentConfirm/PaymentConfirm";
import Policy from "../Layouts/Policy/Policy";
import PostController from "../Layouts/Post/PostController";
import SignUp from "../Layouts/Auth/SignIn/SignUp";
import ViewProfile from "../Layouts/ViewProfile/ViewProfile";
import './App.css';
import ErrorPage from "../Layouts/ErrorPage/ErrorPage";
import Deposit from "../Layouts/Deposit/Deposit";

function App(): React.JSX.Element {
  const [error, setError] = useState(null);
  axios.defaults.headers.common['ngrok-skip-browser-warning'] = "1";
  axios.defaults.headers.common['YghRentalToken'] = localStorage["KeyHeaderToken"];
  axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL_REQUEST;
  useEffect(() => {
    setError(null);
  });
  const Role = parseInt(localStorage["role"]);
  if (error) return (<div>404</div>);
  return (
    <div className="app-container">
      {/*{ location.pathname.split( "/" )[1] !== "dashboard" ?  : <></> }*/}
      <Routes>
        <Route path = { "/" } element = { <><NavigatorBar selected = { "" } /><Home /><Footer/></> } />
        <Route path = { "/attraction/*" } element = { <><NavigatorBar selected = { "" } /><Home /><Footer/></> } />

        <Route path = { "/login/*" } element = { <Login /> } />
        <Route path = { "/changePassword/*" } element = { <ChangePassword /> } />
        <Route path = { "/sign-up/*" } element = { <SignUp /> } />
        <Route path = { "/paymentConfirm/*" } element = { <PaymentConfirm /> } />
        <Route path = { "/policy/*" } element = { <><Policy /><Footer/></> } />
        <Route path = { "/about-us/*" } element = { <><AboutUs /><Footer/></> } />
        <Route path = { "/deposit" } element = {<Deposit/>}/>
        { (Role === ROLE.TENANT || Role === ROLE.LANDLORD) &&
          <>
            <Route path={"/dashboard/*"} element={<Dashboard />} />
            {/* <Route path={"/profile/*"} element={<ViewProfile />} /> */}
            <Route path={"/booking/:reservationId"} element={<BookingLayout />} />
            {
              (Role === ROLE.LANDLORD) &&
              <>

                <Route path = { "/new/:postId/:page" } element = { <CreatePost openMenuClick = { () => { } } /> }></Route>
                <Route path = { "/draft/:postId/:page" } element = { <CreatePost openMenuClick = { () => { } } /> }></Route>
                <Route path = { "/update/:postId/:page" } element = { <CreatePost openMenuClick = { () => { } } /> }></Route>

              </>
            }
          </>
        }
        <Route
          path={"/:error"} element={<ErrorPage/>}
        />
        <Route
          path={"/:user/:id/*"} element={
            <Routes>
              <Route path={""} element={<PostController />} />
              <Route path={"/:apartmentIdParam"} element={<PostController />} />
            </Routes>
          }
        />
        <Route path="/error" element={<ErrorPage/>} />
      </Routes>
    </div>
  );
}
export default App;
