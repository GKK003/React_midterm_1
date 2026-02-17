import { useState } from "react";

function MainDiv() {
  const cardRegex = /^(\d{4}[-. ]?){4}$|^\d{4}[-. ]?\d{6}[-. ]?\d{5}$/;

  const [cardNumber, setCardNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  function handleCardChange(e) {
    const value = e.target.value;
    setCardNumber(value);

    // validate only when user types something
    if (value.length === 0) {
      setIsValid(true);
    } else {
      setIsValid(cardRegex.test(value));
    }
  }

  return (
    <div className="main_div">
      <div className="violet">
        <div className="card_front"></div>
        <div className="card_back"></div>
      </div>

      <div className="form_div">
        <form className="form">
          <label>Cardholder Name</label>
          <input type="text" placeholder="e.g. Jane Appleseed" />

          <label>Card Number</label>
          <input
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            value={cardNumber}
            onChange={handleCardChange}
          />

          {!isValid && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Invalid card number
            </p>
          )}

          <div className="date">
            <div className="column">
              <label>Exp. Date (MM/YY)</label>
              <div className="flex">
                <input type="text" placeholder="MM" />
                <input type="text" placeholder="YY" />
              </div>
            </div>

            <div className="column">
              <label>CVC</label>
              <input type="text" placeholder="e.g. 123" />
            </div>
          </div>

          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default MainDiv;
