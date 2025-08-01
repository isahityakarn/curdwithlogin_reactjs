import React, { useState } from 'react';
import axios from 'axios';
import { encryptPayload } from '../utils/encrypt';
import CaptchaCanvas from './CaptchaCanvas';

const CaptchaForm = ({ onCaptchaVerified, onInputChange }) => {
  const [userInput, setUserInput] = useState("");
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const getBrowserInfo = () => ({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
  });

  const handleCaptchaGenerated = async (newCaptcha) => {
    const browserInfo = getBrowserInfo();
    const encrypted = encryptPayload({ captcha: newCaptcha, browserInfo });

    setIsVerified(false);
    setUserInput('');
    if (onCaptchaVerified) {
      onCaptchaVerified(false);
    }

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
    // Check if input is blank
    if (!userInput.trim()) {
      setMessage('Please enter the CAPTCHA code.');
      return;
    }

    const browserInfo = getBrowserInfo();
    const encrypted = encryptPayload({ captcha: userInput, browserInfo, token });

    try {
      const res = await axios.post('http://localhost:5050/api/users/verifyCaptcha', {
        data: encrypted,
      });

      setMessage(res.data.message);
      
      if (res.data.success) {
        setIsVerified(true);
        if (onCaptchaVerified) {
          onCaptchaVerified(true);
        }
      } else {
        setIsVerified(false);
        if (onCaptchaVerified) {
          onCaptchaVerified(false);
        }
      }
    } catch (err) {
      setMessage('Verification failed.');
      setIsVerified(false);
      if (onCaptchaVerified) {
        onCaptchaVerified(false);
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <CaptchaCanvas onCaptchaGenerated={handleCaptchaGenerated} />
      <input
        type="text"
        placeholder="Enter 6-character CAPTCHA"
        value={userInput}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[a-zA-Z0-9]{0,6}$/.test(value)) {
            setUserInput(value);
            if (onInputChange) {
              onInputChange(value);
            }
            if (isVerified) {
              setIsVerified(false);
              if (onCaptchaVerified) {
                onCaptchaVerified(false);
              }
            }
          }
        }}
        maxLength={6}
        style={{ marginTop: 10 }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: 10 }}>Verify</button>
      <div style={{ marginTop: 10, color: 'blue' }}>{message}</div>
    </div>
  );
};

export default CaptchaForm;