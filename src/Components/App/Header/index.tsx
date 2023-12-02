import NavigatorBar from "../NavigatorBar";
import SearchBar_Hint from "../../Common/Search_Input_Autocomplete";
import "./Header.scss";

interface IProps {
  userImgUrl: string;
  slogan: string;
  placeholderSearchBar: string;
}
function Header(headerProps: IProps) {
  return (
    <div className="header">
      <div className="browse">
        <div className="browse-category">
        </div>
        <SearchBar_Hint
          className="search"
          placeholder={"search"}
          baseHintUrl={"https://dummyjson.com/products"}
          hintEndPoint={"/search"}
        />
      </div>
      <div className="header-title">
        <span>{headerProps.slogan}</span>
      </div>
      <div className="profile">
        <div className="user-profile">
          <img src={headerProps.userImgUrl} alt="" className="user-img" />
        </div>
        <div className="profile-menu">
          <Stack />
          Menu
        </div>
      </div>
      <NavigatorBar></NavigatorBar>
    </div>
  );
}
export default Header;
