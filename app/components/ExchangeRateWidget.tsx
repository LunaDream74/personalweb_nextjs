// app/components/ExchangeRateWidget.tsx

import { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = `https://api.apilayer.com/exchangerates_data/convert?to=VND&from=USD&amount=1`;

function ExchangeRateWidget() {
  const [rate, setRate] = useState('Loading...');

  useEffect(() => {
    const fetchRate = async () => {
      
      // 1. Add this check for the API key
      if (!API_KEY) {
        console.error("Exchange Rate Error: NEXT_PUBLIC_API_KEY is not defined.");
        setRate("N/A");
        return; // Stop the function
      }

      // 2. Add the 'RequestInit' type to requestOptions
      const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow', // This is now correctly typed
        headers: { 
          'apikey': API_KEY // This is now safe because we checked for API_KEY
        }
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
    const intervalId = setInterval(fetchRate, 300000); // 5 minutes
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount

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