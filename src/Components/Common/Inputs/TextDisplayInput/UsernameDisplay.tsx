import { useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";

import "./UsernameDisplay.scss";

interface Iprops {
  content?: string;
  setContent?: Function;
  className?: string;
  editable?: boolean;
}

export default function UsernameDisplay(prop: Iprops) {
  const [value, setValue] = useState<string>(prop.content as string);
  const inputRef = useRef<HTMLDivElement>(null);

  const maxLength: number = 50;
  const maxLengthFontsize: number = 15;

  const turnOnEditor = () => {
    inputRef.current?.setAttribute("contenteditable", "");
    inputRef.current?.focus();
    setCursorToEnd(inputRef.current!);
  };

  function lock() {
    if (inputRef.current != null) {
      inputRef.current.removeAttribute("contenteditable");
    }
  }

  function adjustFontSize(element: EventTarget & HTMLDivElement) {
    if (element.innerText.length >= maxLengthFontsize) {
      element.style.fontSize = "16px";
    } else {
      element.style.fontSize = "32px";
    }
  }

  function setCursorToEnd(el: HTMLDivElement) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false); // Đặt con trỏ ở cuối
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  return (
    <div
      className={"username-container "+(prop.className?(prop.className):("")) }
    >
      <div
        ref={inputRef}
        onDragOver={(e) => e.preventDefault()}
        onBlur={lock}
        style={
          value?.length < maxLengthFontsize
            ? { fontSize: "32px" }
            : { fontSize: "16px" }
        }
        onKeyDown={(e) => {
          if (e.key.match("Enter")) {
            lock();
          }
        }}
        onInput={(e) => {
          if (prop.setContent != undefined) {
            adjustFontSize(e.currentTarget);
            prop.setContent(e.currentTarget.innerText);
            if (e.currentTarget.innerText.length > maxLength) {
              if (
                inputRef.current?.innerText.length! > maxLength &&
                inputRef.current != null
              ) {
                inputRef.current.innerText = inputRef.current?.innerText.slice(
                  0,
                  maxLength
                );
                setCursorToEnd(e.currentTarget);
              }
            }
          }
        }}
      >
        {value}
      </div>
      {prop.editable && prop.setContent != undefined ? (
        <span className="edit-icon" onClick={turnOnEditor}>
          <FiEdit3 />
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
