import React, { useState } from 'react';
import CaptchaCanvas from './CaptchaCanvas';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;
    if (name === 'captchaInput') {
      setCaptchaInput(value);
      if (captchaError) setCaptchaError('');
    } else {
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
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Captcha validation
    if (!captchaInput) {
      setCaptchaError('Please enter the captcha');
    } else if (captchaInput !== captcha) {
      setCaptchaError('Captcha does not match');
    } else {
      setCaptchaError('');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !captchaError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    if (!validateForm()) {
      setMessage('Please fix the errors below before submitting.');
      setMessageType('danger');
      return;
    }
    // Only submit if captcha is verified
    if (captchaInput !== captcha) {
      setCaptchaError('Captcha does not match');
      return;
    }
    setLoading(true);
    try {
      const result = await register(formData.name, formData.email, formData.phone, formData.password);
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        let errorMessage = result.message;
        if (Array.isArray(errorMessage)) {
          errorMessage = errorMessage.join(', ');
        }
        if (result.details && Array.isArray(result.details)) {
          const detailedErrors = result.details.map(detail => {
            const fieldName = detail.path ? detail.path.charAt(0).toUpperCase() + detail.path.slice(1) : 'Field';
            return `• ${fieldName}: ${detail.msg || detail.message || 'Invalid value'}`;
          }).join('\n');
          errorMessage = result.message ? `${result.message}\n\n${detailedErrors}` : detailedErrors;
        }
        setMessage(errorMessage);
        setMessageType('danger');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
      setMessageType('danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Register</h2>
            
            {message && (
              <div className={`alert alert-${messageType}`} role="alert" style={{ whiteSpace: 'pre-line' }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
       
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <div className="invalid-feedback d-block">
                    {errors.phone}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.name && (
                  <div className="invalid-feedback d-block">
                    {errors.name}
                  </div>
                )}
              </div>

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
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

                     <div className="mb-3">
                <label className="form-label">Captcha</label>
                <CaptchaCanvas onCaptchaGenerated={setCaptcha} />
                <input
                  type="text"
                  className={`form-control ${captchaError ? 'is-invalid' : ''}`}
                  name="captchaInput"
                  value={captchaInput}
                  onChange={handleChange}
                  placeholder="Enter the captcha text"
                  autoComplete="off"
                />
                {captchaError && (
                  <div className="invalid-feedback d-block">{captchaError}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Creating Account...
                  </>
                ) : (
                  'Register'
                )}
              </button>
            </form>

            <div className="text-center mt-3">
              <p className="mb-0">
                Already have an account?{' '}
                <Link to="/login" className="text-decoration-none">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
