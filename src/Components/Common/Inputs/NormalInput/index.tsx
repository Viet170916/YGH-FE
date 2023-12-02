import React, { JSX, useState } from "react";
import "./NormalInput.scss";
interface IProps {
  placeHolder: string;
  text_type?: boolean;
  password_type?: boolean;
  onChange: (value: string) => void;
}
function index(props: IProps): JSX.Element {

  const [inputValue, setInputValue] = useState(""); // Sử dụng useState để lưu trữ giá trị của trường nhập liệu

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue); // Cập nhật giá trị của trường nhập liệu
    props.onChange(newValue); // Gọi hàm onChange để truyền giá trị mới lên component cha
  };

  return (
    <>
      <div className="input-container">
        <input
          className="input"
          type={
            props.text_type ? "text" : props.password_type ? "password" : "text"
          }
          placeholder={props.placeHolder}
          value={inputValue} // Đặt giá trị của trường nhập liệu bằng giá trị trong state
          onChange={handleInputChange} // Đặt sự kiện onChange để xử lý thay đổi giá trị
        />
      </div>
    </>
  );
}
export default index;
