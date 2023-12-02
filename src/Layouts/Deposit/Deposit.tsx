import "./Deposit.scss";
import axios from "axios";
import { parse } from "qs";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Deposit() {
  const [amount, setAmount] = useState<number>(0);

  const handleDeposit = () => {
    axios
      .post("/api/deposit", null, { params: { amount: amount } })
      .then((response) => {
        console.log(response);
        Swal.fire(
          "Success",
          `Deposit money to account successfuly! New account balance: ${response.data.newBalance}$`,
          "success"
        );
      })
      .catch((error) => {
        console.log(error);

        Swal.fire("Error", error.message, "error");
      });
  };
  return (
    <div className={"deposit-container"}>
      <h1>Enter amount of money you want to deposit</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(parseFloat(e.target.value));
        }}
      />
      <button
        className={"border-light-color base-border-radius red-button "}
        onClick={handleDeposit}
      >
        Deposit
      </button>
      <button
        className={"border-light-color base-border-radius red-button "}
        onClick={() => {
          window.location.replace("/");
        }}
        style={{marginLeft:"2rem"}}
      >
        Home
      </button>
    </div>
  );
}
