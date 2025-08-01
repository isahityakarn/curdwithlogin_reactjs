import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CaptchaForm from './CaptchaForm';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Verify OTP
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaInputValue, setCaptchaInputValue] = useState('');

  const handleCaptchaVerification = (isVerified) => {
    setIsCaptchaVerified(isVerified);
  };

  const handleCaptchaInputChange = (value) => {
    setCaptchaInputValue(value);
  };

  const goBackToStep1 = () => {
    setStep(1);
    setFormData({ email: formData.email, otp: '' });
    setErrors({});
    setMessage('');
    setSuccessMessage('');
    setCaptchaInputValue('');
    setIsCaptchaVerified(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    } else if (step === 2) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.otp) {
        newErrors.otp = 'OTP is required';
      } else if (formData.otp.length !== 6) {
        newErrors.otp = 'OTP must be 6 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage('');
    setSuccessMessage('');
    
    if (!validateForm()) {
      setMessage('Please fix the errors below before submitting.');
      return;
    }

    // Check CAPTCHA verification for step 1
    if (step === 1) {
      if (!isCaptchaVerified) {
        if (!captchaInputValue.trim()) {
          setMessage('Please enter the CAPTCHA code in the input box.');
        } else {
          setMessage('CAPTCHA verification failed. Please try again or reload the CAPTCHA.');
        }
        return;
      }
    }

    setLoading(true);

    try {
      if (step === 1) {
        // Send OTP API call
        const response = await axios.post('http://localhost:5050/api/users/send-otp', {
          email: formData.email
        });
        
        if (response.data.message) {
          setLoading(false);
          setMessage('');
          setIsCaptchaVerified(false);
          setCaptchaInputValue('');
          setSuccessMessage('OTP has been sent to your email address. Please check your email and enter the OTP below.');
          setStep(2);
          return;
        } else {
          setMessage(response.data.message || 'Failed to send OTP. Please try again.');
        }
      } else if (step === 2) {
        // Verify OTP API call
        const response = await axios.post('http://localhost:5050/api/users/verify-otp', {
          email: formData.email,
          otp: formData.otp
        });
        
        if (response.data.message) {
          setSuccessMessage('OTP verified successfully! Redirecting to login page...');
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setMessage(response.data.message || 'Invalid OTP. Please try again.');
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              {step === 1 ? 'Forgot Password' : 'Verify OTP'}
            </h2>
            <p className="text-muted text-center mb-4">
              {step === 1 
                ? "Enter your email address and we'll send you an OTP to reset your password."
                : "Enter the OTP sent to your email address."
              }
            </p>
            
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  disabled={step === 2}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </div>

              {step === 2 && (
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    OTP
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.otp ? 'is-invalid' : ''}`}
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  {errors.otp && (
                    <div className="invalid-feedback d-block">
                      {errors.otp}
                    </div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="mb-3">
                  <CaptchaForm 
                    onCaptchaVerified={handleCaptchaVerification}
                    onInputChange={handleCaptchaInputChange}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                disabled={loading || (step === 1 && !isCaptchaVerified)}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    {step === 1 ? 'Sending...' : 'Verifying...'}
                  </>
                ) : step === 1 ? (
                  isCaptchaVerified ? 'Send OTP' : 'Verify CAPTCHA First'
                ) : (
                  'Verify OTP'
                )}
              </button>

              {step === 2 && (
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={goBackToStep1}
                  disabled={loading}
                >
                  Back to Email
                </button>
              )}
            </form>

            <div className="text-center mt-3">
              <p className="mb-0">
                Remember your password?{' '}
                <Link to="/login" className="text-decoration-none">
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
