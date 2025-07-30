import React, { useState } from 'react';
import axios from 'axios';
import { encryptPayload } from '../utils/encrypt';
import CaptchaCanvas from './CaptchaCanvas';

const CaptchaForm = () => {
  const [userInput, setUserInput] = useState("");
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const getBrowserInfo = () => ({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
  });

  const handleCaptchaGenerated = async (newCaptcha) => {
    const browserInfo = getBrowserInfo();
    const encrypted = encryptPayload({ captcha: newCaptcha, browserInfo });

    try {
      const res = await axios.post('http://localhost:5050/api/users/getCaptchaRequest', {
        data: encrypted,
      });

      if (res.data.success) {
        setToken(res.data.token);
        setMessage('');
      } else {
        setMessage(res.data.message || 'Server rejected CAPTCHA.');
      }
    } catch (err) {
      setMessage('');
    }
  };

  const handleSubmit = async () => {
    const browserInfo = getBrowserInfo();
    const encrypted = encryptPayload({ captcha: userInput, browserInfo, token });

    try {
      const res = await axios.post('http://localhost:5050/api/users/verifyCaptcha', {
        data: encrypted,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage('Verification failed.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {/* <h3>CAPTCHA Verification</h3> */}
      <CaptchaCanvas onCaptchaGenerated={handleCaptchaGenerated} />
      <input
        type="text"
        placeholder="Enter CAPTCHA"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ marginTop: 10 }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: 10 }}>Verify</button>
      <div style={{ marginTop: 10, color: 'blue' }}>{message}</div>
    </div>
  );
};

export default CaptchaForm;