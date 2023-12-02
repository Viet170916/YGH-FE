import PersonalInformationBox from "../../../Components/Others/PersonalInformationBox";
import MyProfileFilterBar from "../DashboardFilter/MyProfileFilterBar";

interface IProps {
  openMenuClick: () => void;
}

export default function MyProfile(props: IProps) {
  return (
    <div
      className="private-profile-wrapper right-area"
      style={{ overflow: "auto" }}
    >
      <MyProfileFilterBar openMenuClick={props.openMenuClick} />
      <div className="page-right-content">
        <PersonalInformationBox
        />
      </div>
    </div>
  );
}
