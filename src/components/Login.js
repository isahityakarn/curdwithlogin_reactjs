import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CaptchaForm from './CaptchaForm';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleCaptchaVerification = (isVerified) => {
    setIsCaptchaVerified(isVerified);
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
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

    if (!isCaptchaVerified) {
      setMessage('Please verify the CAPTCHA before logging in.');
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
                  autoComplete="current-password"
                />
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <CaptchaForm onCaptchaVerified={handleCaptchaVerification} />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading || !isCaptchaVerified}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Logging in...
                  </>
                ) : isCaptchaVerified ? (
                  'Login'
                ) : (
                  'Verify CAPTCHA First'
                )}
              </button>
            </form>

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
