import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import "./App.css";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  console.log("currencies:", currencies);

useEffect(() => {
  fetch("https://api.frankfurter.app/currencies")
    .then(res => {
      if (!res.ok) throw new Error("API failed");
      return res.json();
    })
    .then(data => {
      const curr = Object.entries(data || {});

      if (curr.length === 0) return;

      setCurrencies(curr);
      setFromCurrency(curr[0][0]);
      setToCurrency(curr[1][0]);
    })
    .catch(err => {
      console.log("Currency API error:", err);
    });
}, []);

 const convert = () => {
  if (!amount || !fromCurrency || !toCurrency) {
    console.log("Missing values");
    return;
  }

  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    .then(res => {
      if (!res.ok) throw new Error("Convert API failed");
      return res.json();
    })
    .then(data => {
      console.log("API response:", data);

      if (!data?.rates) {
        console.log("Invalid response");
        return;
      }

      setResult(Object.values(data.rates)[0]);
    })
    .catch(err => console.log("Conversion error", err));
};
  return (
    <div className="container">
      <h1>Currency Converter</h1>

      <div className="box">
        <div className="leftbox">
          <Dropdown
  options={currencies.length ? currencies.map(c => c[0]) : []}
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
  options={currencies.length ? currencies.map(c => c[0]) : []}
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