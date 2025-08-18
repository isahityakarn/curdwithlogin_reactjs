import React, { useState } from 'react';

const LoginWithOtp = () => {
  const [loginType, setLoginType] = useState('email'); // 'email' or 'phone'
  const [identifier, setIdentifier] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateIdentifier = () => {
    if (loginType === 'email') {
      if (!identifier) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(identifier)) return 'Email is invalid';
    } else {
      if (!identifier) return 'Phone number is required';
      if (!/^\d{10}$/.test(identifier)) return 'Phone number must be 10 digits';
    }
    return '';
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    const error = validateIdentifier();
    if (error) {
      setMessage(error);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5050/api/users/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, type: loginType })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setOtpSent(true);
        setMessage('OTP sent successfully!');
      } else {
        setMessage(result.message || 'Failed to send OTP.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!otp) {
      setMessage('Please enter the OTP.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5050/api/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, otp, type: loginType })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setMessage('Login successful!');
        // Redirect or set auth state here
      } else {
        setMessage(result.message || 'Invalid OTP.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login with OTP</h2>
            {message && <div className="alert alert-info" role="alert">{message}</div>}
            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <div className="mb-3">
                  <label htmlFor="identifier" className="form-label">
                    {loginType === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  <div className="input-group">
                    <select
                      id="loginType"
                      className="form-select"
                      style={{ maxWidth: '120px' }}
                      value={loginType}
                      onChange={e => {
                        setLoginType(e.target.value);
                        setIdentifier('');
                        setMessage('');
                      }}
                    >
                      <option value="email">&#x2709;</option>
                      <option value="phone">&#x1F4F1;</option>
                    </select>
                    <input
                      type={loginType === 'email' ? 'email' : 'tel'}
                      className="form-control"
                      id="identifier"
                      name="identifier"
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your phone number'}
                      autoComplete={loginType === 'email' ? 'email' : 'tel'}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">Enter OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP & Login'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithOtp;
