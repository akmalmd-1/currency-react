import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import "./App.css";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("/api/currencies")
      .then((res) => res.json())
      .then((res) => {
        const curr = Object.entries(res);
        setCurrencies(curr);
        setFromCurrency(curr[0][0]);
        setToCurrency(curr[1][0]);
      });
  }, []);

  const convert = () => {
    fetch(
      `/api/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(Object.values(data.rates)[0]);
      });
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>

      <div className="box">
        <div className="leftbox">
          <Dropdown
            options={currencies.map((c) => c[0])}
            selected={fromCurrency}
            onSelect={setFromCurrency}
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="swap">
  <button onClick={() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }}>
    ⇄
  </button>
</div>

        <div className="rightbox">
          <Dropdown
            options={currencies.map((c) => c[0])}
            selected={toCurrency}
            onSelect={setToCurrency}
          />

          <input type="number" value={result} readOnly />
        </div>
      </div>

      <div className="btn">
        <button onClick={convert}>Convert</button>
      </div>
    </div>
  );
}

export default CurrencyConverter;