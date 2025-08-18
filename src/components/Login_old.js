import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { loginWithOtp } = useAuth();
  const [formData, setFormData] = useState({ identifier: '' });
  const [loginType, setLoginType] = useState('email');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (loginType === 'email') {
      if (!formData.identifier) {
        newErrors.identifier = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.identifier)) {
        newErrors.identifier = 'Email is invalid';
      }
    } else {
      if (!formData.identifier) {
        newErrors.identifier = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.identifier)) {
        newErrors.identifier = 'Phone number must be 10 digits';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validateForm()) {
      setMessage('Please fix the errors below before submitting.');
      return;
    }
    setLoading(true);
    try {
      const bodyData = loginType === 'email'
        ? { email: formData.identifier, type: loginType }
        : { phone: formData.identifier, type: loginType };
      const response = await fetch('http://localhost:5050/api/login/loginwithotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
      const result = await response.json();
      console.log("welcome : "+formData.identifier);

      if (result.message) {
        setMessage('OTP sent successfully!');
        setOtpSent(true);
      } else {
        setMessage('Failed to send OTP.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  // OTP verification handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!otp) {
      setMessage('Please enter the OTP.');
      return;
    }
    setLoading(true);
    try {
      const bodyData = loginType === 'email'
        ? { email: formData.identifier, otp, type: loginType }
        : { phone: formData.identifier, otp, type: loginType };
      const response = await fetch('http://localhost:5050/api/login/verifylogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await response.json();
      if (data.message) {
        setMessage('Login successful!');
        if (data.token && data.user) {
          loginWithOtp(data.token, data.user);
          navigate('/dashboard');
        }
      } else {
        setMessage(data.message || 'Invalid OTP.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login</h2>
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSubmit}>
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
                        setFormData(prev => ({ ...prev, identifier: '' }));
                        setErrors({});
                      }}
                    >
                      <option value="email">&#x2709;</option>
                      <option value="phone">&#x1F4F1;</option>
                    </select>
                    <input
                      type={loginType === 'email' ? 'email' : 'tel'}
                      className={`form-control ${errors.identifier ? 'is-invalid' : ''}`}
                      id="identifier"
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleChange}
                      placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your phone number'}
                      autoComplete={loginType === 'email' ? 'email' : 'tel'}
                    />
                  </div>
                  {errors.identifier && (
                    <div className="invalid-feedback d-block">
                      {errors.identifier}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
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

            <div className="text-center mt-3">
              <p className="mb-2">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot your password?
                </Link>
              </p>
              <p className="mb-0">
                Don't have an account?{' '}
                <Link to="/register" className="text-decoration-none">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
