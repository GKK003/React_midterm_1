import { useState } from "react";
import Inside_front from "../../__molecules/insidefront/insidefront";
import CardNumbers from "../../__atoms/card numbers/cardnumbers";

function MainDiv() {
  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;
  const cardRegex = /^(?:\d{4}\s){3}\d{4}$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  const yearRegex = /^\d{2}$/;
  const cvcRegex = /^\d{3,4}$/;

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);

  function NameChange(e) {
    const value = e.target.value;
    setName(value);
    setNameValid(value === "" ? true : nameRegex.test(value.trim()));
  }

  const [cardNumber, setCardNumber] = useState("");
  const [cardValid, setCardValid] = useState(true);

  function CardChange(e) {
    let value = e.target.value;

    value = value.replace(/[^\d ]/g, "");

    if (value.length > 19) return;

    setCardNumber(value);

    if (value.length < 19) {
      setCardValid(true);
    } else {
      setCardValid(cardRegex.test(value));
    }
  }

  const [month, setMonth] = useState("");
  const [monthValid, setMonthValid] = useState(true);

  function MonthChange(e) {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > 2) return;

    setMonth(value);
    setMonthValid(value.length < 2 ? true : monthRegex.test(value));
  }

  const [year, setYear] = useState("");
  const [yearValid, setYearValid] = useState(true);

  function YearChange(e) {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > 2) return;

    setYear(value);
    setYearValid(value.length < 2 ? true : yearRegex.test(value));
  }

  const [cvc, setCvc] = useState("");
  const [cvcValid, setCvcValid] = useState(true);

  function CvcChange(e) {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > 4) return;

    setCvc(value);
    setCvcValid(value.length < 3 ? true : cvcRegex.test(value));
  }

  return (
    <div className="main_div">
      <div className="violet">
        <div className="card_front">
          <Inside_front />
          <CardNumbers text={cardNumber} />
        </div>
        <div className="card_back"></div>
      </div>

      <div className="form_div">
        <form className="form">
          <label>Cardholder Name</label>
          <input
            type="text"
            placeholder="e.g. Jane Appleseed"
            value={name}
            onChange={NameChange}
          />
          {!nameValid && (
            <p style={{ color: "red", fontSize: "12px" }}>Invalid name</p>
          )}

          <label>Card Number</label>
          <input
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            value={cardNumber}
            onChange={CardChange}
          />
          {!cardValid && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Invalid card number
            </p>
          )}

          <div className="date">
            <div className="column">
              <label>Exp. Date (MM/YY)</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="MM"
                  value={month}
                  onChange={MonthChange}
                />
                <input
                  type="text"
                  placeholder="YY"
                  value={year}
                  onChange={YearChange}
                />
              </div>
              {!monthValid && (
                <p style={{ color: "red", fontSize: "12px" }}>Invalid month</p>
              )}
              {!yearValid && (
                <p style={{ color: "red", fontSize: "12px" }}>Invalid year</p>
              )}
            </div>

            <div className="column">
              <label>CVC</label>
              <input
                type="text"
                placeholder="e.g. 123"
                value={cvc}
                onChange={CvcChange}
              />
              {!cvcValid && (
                <p style={{ color: "red", fontSize: "12px" }}>Invalid CVC</p>
              )}
            </div>
          </div>

          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default MainDiv;
