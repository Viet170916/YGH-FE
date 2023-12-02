import axios, { AxiosResponse } from "axios";
import MyProfileFilterBar from "../DashboardFilter/MyProfileFilterBar";
import UpgradeAccountInputs from "./../../../Components/Others/UpgradeAccountInputs";

interface IProps {
  openMenuClick: () => void;
}

export default function UpgradeAccount(props: IProps) {
  // axios.get(url).then((response: AxiosResponse<object>) => response.data);
  

  return (
    <div
      className="private-profile-wrapper right-area"
      style={{ overflow: "auto" }}
    >
      <MyProfileFilterBar openMenuClick={props.openMenuClick} />
      <div className="page-right-content">
        <UpgradeAccountInputs />
      </div>
    </div>
  );
}
