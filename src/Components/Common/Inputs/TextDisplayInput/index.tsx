import classNames from "classnames";
import * as EmailValidator from "email-validator";
import { useRef, useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import "./TextDisplayInput.scss";

interface Iprops {
  label: string;
  content?: string;
  setContent?: Function;
  isPassword?: boolean;
  maxLength?: number;
  isEmail?: boolean;
  className?: string;
  required?: boolean;
}

export default function TextDisplayInput(prop: Iprops) {
  const inputRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | undefined>(prop.content);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  const isEditable: boolean = true;

  const turnOnEditor = () => {
    if (prop.isPassword) {
      passwordRef.current?.removeAttribute("disabled");
      passwordRef.current?.focus();
    } else {
      inputRef.current?.setAttribute("contenteditable", "");
      inputRef.current?.focus();
      setCursorToEnd(inputRef.current!);
    }
  };

  function lock() {
    if (inputRef.current != null) {
      inputRef.current.removeAttribute("contenteditable");
    } else if (prop.isPassword) {
      passwordRef.current?.setAttribute("disabled", "");
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
  function validateEmail(): boolean {
    return EmailValidator.validate(inputRef.current?.innerText!);
  }
  return (
    <>
      <label className="box-label">{prop.label}</label>
      <div
        className={classNames("input-container", prop.className)}
        id={prop.label}
      >
        {prop.isPassword ? (
          <input
            maxLength={prop.maxLength}
            disabled
            type="password"
            className="content"
            ref={passwordRef}
            onBlur={() => {
              lock();
            }}
            onKeyDown={(e) => {
              if (e.key.match("Enter")) {
                lock();
              }
            }}
            onInput={(e) => {
              if (prop.setContent) {
                prop.setContent(e.currentTarget.value);
                if (prop.required && passwordRef.current?.value.length == 0)
                  setIsCorrect(false);
                else setIsCorrect(true);
              }
            }}
            value={prop.content}
          />
        ) : (
          <div
            className="content"
            ref={inputRef}
            onDragOver={(e) => e.preventDefault()}
            onBlur={() => {
              lock();
              if (prop.isEmail) setIsCorrect(validateEmail());
            }}
            onKeyDown={(e) => {
              if (e.key.match("Enter")) {
                lock();
              }
            }}
            onInput={(e) => {
              if (prop.setContent) {
                prop.setContent(e.currentTarget.innerText);
                if (prop.required && inputRef.current?.textContent?.length == 0)
                  setIsCorrect(false);
                else setIsCorrect(true);
              }
              if (
                prop.maxLength != null &&
                e.currentTarget.innerText.length > prop.maxLength
              ) {
                if (
                  inputRef.current?.innerText.length! > prop.maxLength &&
                  inputRef.current != null
                ) {
                  inputRef.current.innerText =
                    inputRef.current?.innerText.slice(0, prop.maxLength);
                  setCursorToEnd(e.currentTarget);
                }
              }
            }}
          >
            {value}
          </div>
        )}
        {isEditable && !prop.isEmail ? (
          <span className="edit-icon" onClick={turnOnEditor}>
            <FiEdit3 />
            {isCorrect ? (
              <></>
            ) : (
              <span className="warning-icon">
                <AiFillWarning />
              </span>
            )}
          </span>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
