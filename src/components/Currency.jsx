import React, { useState, useEffect } from 'react';
import '../css/currency.css';
import { HiArrowsRightLeft } from "react-icons/hi2";
import axios from 'axios';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "YOUR_FREECURRENCYAPİ.com_API";

const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TRY');
  const [result, setResult] = useState(0);

  // exchange fonksiyonunu kullanarak sonucu anında hesapla
  const exchange = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
      const result = (response.data.data[toCurrency] * amount).toFixed(2);
      setResult(result);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  useEffect(() => {
    exchange(); // amount, fromCurrency, veya toCurrency değiştiğinde exchange fonksiyonu çalışır
  }, [amount, fromCurrency, toCurrency]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        toast.success(`Panoya Kopyalandı!: ${result}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      })
      .catch((err) => {
        toast.error("Kopyalama sırasında bir hata oluştu.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        console.error('Panoya kopyalama sırasında bir hata oluştu:', err);
      });
  };

  return (
    <>
    <ToastContainer />
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div className="currency-div">
        <div style={{ marginTop: '-20px', borderRadius: '15px', backgroundColor: 'black', color: '#fff', width: '100%', textAlign: 'center' }}>
          <h3>DÖVİZ GÜNCEL KURLARI</h3>
        </div>
        <div style={{ marginTop: '25px' }}>
          <a style={{ fontSize: '20px', fontFamily: "Rubik, serif", color: 'black', backgroundColor: 'white', borderRadius: '25px', padding: '5px' }}>Miktar Seç</a><br></br>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="amount"
            style={{ borderRadius: '15px', backgroundColor: 'black', color: 'white' }}
          />
          <select 
          style={{ borderRadius: '15px', backgroundColor: 'green'}} 
          onChange={(e) => setFromCurrency(e.target.value)} className="from-currency-option">
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
          </select>
          <HiArrowsRightLeft style={{ backgroundColor: 'lightslategray', borderRadius: '15px', fontSize: '30px', color: 'black', marginRight: '10px', marginTop: '-2' }} />
          <select style={{ borderRadius: '15px', backgroundColor: 'red' }} onChange={(e) => setToCurrency(e.target.value)} className="to-currency-option">
            <option style={{ borderRadus: '50px', backgroundColor: 'red' }}>TRY</option>
            <option style={{ borderRadus: '15px' }}>USD</option>
            <option style={{ borderRadus: '15px' }}>EUR</option>
          </select>
          <input
            value={result}
            type="number"
            className="result"
            readOnly
            onClick={copyToClipboard}
          />
        </div>
        <div>
          <button
            onClick={exchange}
            style={{
              fontFamily: "Poppins, serif",
            }}
            className="exchange-button">Hesapla</button>
        <Footer/>
        </div>
      </div>
    </>
  );
};

export default Currency; 
