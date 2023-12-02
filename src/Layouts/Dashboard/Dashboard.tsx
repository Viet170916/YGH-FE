import React, { JSX, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ROLE from "../../Common/Enum/Role";
import DashboardNav from "../../Components/App/NavigatorBar/DashboardNav/DashboardNav";
import Account from "./ContentDisplayer/Account";
import DraftLayout from "./ContentDisplayer/DraftLayout";
import ManagePost from "./ContentDisplayer/ManagePost";
import MyProfile from "./ContentDisplayer/MyProfile";
import RentalRequestLayout from "./ContentDisplayer/RentalRequestLayout";
import UpgradeAccount from "./ContentDisplayer/UpgradeAccount";

interface IProps{
  children?: any;
}
function Dashboard( props: IProps ): JSX.Element{
  const listElement = useRef<HTMLDivElement>();
  //handler functions<
  function OpenMenu(){
    listElement.current?.focus();
    listElement.current?.classList.remove( "hide-on-mobile" );
  }
  const Role = parseInt( localStorage["role"] );
  console.log( Role );
  return (
    <div className = { "main-dashboard-screen app-wrapper" }>
      <DashboardNav ref = { listElement } />
      <Routes>
        {/*<Route path = { "/" } element = { <Navigate to = { "./post-management" } /> } />*/ }
        {/*home above, others below*/ }
        <Route
          path = { "/my-profile" }
          element = { <MyProfile openMenuClick = { OpenMenu } /> }
        />
        <Route
          path = { "/account" }
          element = { <Account openMenuClick = { OpenMenu } /> }
        />
        <Route
          path = { "/account/upgrade" }
          element = { <UpgradeAccount openMenuClick = { OpenMenu } /> }
        />
        {
          (Role === ROLE.TENANT || Role === ROLE.LANDLORD) &&
          <>
            <Route path = { "/booking" } element = { <></> } />
            {
              (Role === ROLE.LANDLORD) &&
              <>
                <Route
                  path = { "/order" }
                  element = { <RentalRequestLayout openMenuClick = { OpenMenu } /> }
                />
                <Route
                  path = { "/post-management/*" }
                  element = { <ManagePost openMenuClick = { OpenMenu } /> }
                />
                <Route path = { "/draft" } element = { <DraftLayout openMenuClick = { OpenMenu } /> } />
              </>
            }
            <Route
              path = { "/*" }
              element = { <Navigate to = { "./order" } /> }
            />
          </>
        }
        <Route
          path = { "/*" }
          element = { <Navigate to = { "/login" } /> }
        />
        {/*<Route path = "*" element = { <Navigate to = { "/error" } /> } />}*/}
      </Routes>
    </div>
  );
}
export default Dashboard;
