import React, { useState, useEffect } from 'react';
import '../css/currency.css';
import { HiArrowsRightLeft } from "react-icons/hi2";
import axios from 'axios';

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "your_freeAPI_key";
//1) Go freecurrencyapi.com to register.
// and take your API

const Currency = () => {
    
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [result, setResult] = useState(0);

    const exchange = async () => {
        // alert(amount)
        // alert(fromCurrency)
        // alert(toCurrency)
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
        const result = (response.data.data[toCurrency] * amount).toFixed(2);
        setResult(result);
    }
  return (
    <>
    <div className="currency-div">
        <div style={{ marginTop: '-20px', backgroundColor: 'black', color: '#fff', width: '100%', textAlign: 'center'}}>
            <h3>DOVİZ GÜNCEL KURLARI</h3>
        </div>
        <div style={{marginTop: '25px'}}>
        <a style={{ fontSize: '20px', fontFamily: "Rubik, serif", color: 'black', backgroundColor: 'white', borderRadius: '25px', padding: '5px'}}>Miktar Seç</a><br></br>
        <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number" className="amount" />
        <select onChange={(e) => setFromCurrency(e.target.value)} className="from-currency-option">
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
        </select>
        <HiArrowsRightLeft style={{ backgroundColor: 'lightslategray', borderRadius: '15px', fontSize: '30px', color: 'black', marginRight: '10px', marginTop: '-2'}}/>
       
        <select style={{ borderRadius: '15px' }} onChange={(e) => setToCurrency(e.target.value)} className="to-currency-option">
            <option style={{ borderRadus: '50px', backgroundColor: 'red' }}>TRY</option>
            <option style={{ borderRadus: '15px' }}>USD</option>
            <option style={{ borderRadus: '15px' }}>EUR</option>
        </select>
        <input value={result} onChange={(e) => setResult(e.target.value)} type="number" className="result" readOnly ></input>

        </div>
        
            <div>
            <button 
            onClick={exchange}
            style={{
                fontFamily: "Poppins, serif",
            }}
            className="exchange-button">Hesapla</button>
            </div>

     </div>
    </>
  )
}

export default Currency
