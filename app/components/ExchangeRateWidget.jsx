import { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = `https://api.apilayer.com/exchangerates_data/convert?to=VND&from=USD&amount=1`;

function ExchangeRateWidget() {
  const [rate, setRate] = useState('Loading...');

  useEffect(() => {
    const fetchRate = async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: { 'apikey': API_KEY }
      };

      try {
        const response = await fetch(API_URL, requestOptions);
        if (!response.ok) throw new Error('Failed to fetch rate');
        
        const data = await response.json();
        const formattedRate = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 0
        }).format(data.result);
        
        setRate(formattedRate);
      } catch (error) {
        console.error('Exchange Rate Error:', error);
        setRate('N/A');
      }
    };

    fetchRate();
    const intervalId = setInterval(fetchRate, 300000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="info-row exchange-rate-widget">
      <strong>USD to VND Exchange Rate</strong>
      <div id="exchangeRateValue" className="rate-value">
        {rate}
      </div>
    </div>
  );
}

export default ExchangeRateWidget;