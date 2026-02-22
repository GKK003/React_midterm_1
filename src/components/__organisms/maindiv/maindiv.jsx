import { useState } from "react";
import Inside_front from "../../__molecules/insidefront/insidefront";
import Check from "../../../assets/check.png";

function MainDiv() {
  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;
  const cardRegex = /^(?:\d{4} ){3}\d{4}$/;
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
    let nums = e.target.value.replace(/\D/g, "").slice(0, 16);
    let filled = nums.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(filled);
    setCardValid(filled.length < 19 ? true : cardRegex.test(filled));
  }

  const [month, setMonth] = useState("");
  const [monthValid, setMonthValid] = useState(true);

  function MonthChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonth(value);
    setMonthValid(value.length < 2 ? true : monthRegex.test(value));
  }

  const [year, setYear] = useState("");
  const [yearValid, setYearValid] = useState(true);

  function YearChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setYear(value);
    setYearValid(value.length < 2 ? true : yearRegex.test(value));
  }

  const [cvc, setCvc] = useState("");
  const [cvcValid, setCvcValid] = useState(true);

  function CvcChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvc(value);
    setCvcValid(value.length < 3 ? true : cvcRegex.test(value));
  }

  const [submitted, setSubmitted] = useState(false);

  function Submit(e) {
    e.preventDefault();

    let valid = true;

    if (!nameRegex.test(name.trim())) {
      setNameValid(false);
      valid = false;
    }
    if (!cardRegex.test(cardNumber)) {
      setCardValid(false);
      valid = false;
    }
    if (!monthRegex.test(month)) {
      setMonthValid(false);
      valid = false;
    }
    if (!yearRegex.test(year)) {
      setYearValid(false);
      valid = false;
    }
    if (!cvcRegex.test(cvc)) {
      setCvcValid(false);
      valid = false;
    }

    if (valid) {
      setSubmitted(true);
    }
  }

  function Continue() {
    setName("");
    setCardNumber("");
    setMonth("");
    setYear("");
    setCvc("");
    setNameValid(true);
    setCardValid(true);
    setMonthValid(true);
    setYearValid(true);
    setCvcValid(true);
    setSubmitted(false);
  }

  return (
    <div className="main_div">
      <div className="violet">
        <div className="card_front">
          <Inside_front />
          <p className="card_number">{cardNumber}</p>
          <div className="card_bottom">
            <p className="card_name">{name}</p>
            <p className="card_expiry">
              {month || "00"}/{year || "00"}
            </p>
          </div>
        </div>

        <div className="card_back">
          <div className="card_line"></div>
          <div className="card_cvc_div">
            <div className="card_cvc_gray">
              <p className="card_cvc">{cvc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="form_div">
        {submitted ? (
          <div className="success_div">
            <div className="success_oval">
              <img src={Check} alt="check" />
            </div>
            <h1 className="success_header">THANK YOU!</h1>
            <p className="success_text">We've added your card details</p>
            <button onClick={Continue}>Continue</button>
          </div>
        ) : (
          <form className="form" onSubmit={Submit} noValidate>
            <label>Cardholder Name</label>
            <input
              type="text"
              placeholder="e.g. Jane Appleseed"
              value={name}
              onChange={NameChange}
              style={{ borderColor: !nameValid ? "#ff5252" : "" }}
            />
            {!nameValid && <p className="error">Wrong format, letters only</p>}

            <label>Card Number</label>
            <input
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              value={cardNumber}
              onChange={CardChange}
              style={{ borderColor: !cardValid ? "#ff5252" : "" }}
            />
            {!cardValid && <p className="error">Not Filled</p>}

            <div className="date">
              <div className="column">
                <label>Exp. Date (MM/YY)</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="MM"
                    value={month}
                    onChange={MonthChange}
                    style={{ borderColor: !monthValid ? "#ff5252" : "" }}
                  />
                  <input
                    type="text"
                    placeholder="YY"
                    value={year}
                    onChange={YearChange}
                    style={{ borderColor: !yearValid ? "#ff5252" : "" }}
                  />
                </div>
                {!monthValid && <p className="error">Invalid month</p>}
                {!yearValid && <p className="error">Invalid year</p>}
              </div>

              <div className="column">
                <label>CVC</label>
                <input
                  type="text"
                  placeholder="e.g. 123"
                  value={cvc}
                  onChange={CvcChange}
                  style={{ borderColor: !cvcValid ? "#ff5252" : "" }}
                />
                {!cvcValid && <p className="error">Invalid CVC</p>}
              </div>
            </div>

            <button type="submit">Confirm</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MainDiv;
