import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from URL parameters
    const urlToken = searchParams.get('token');
    console.log('Token from URL:', urlToken); // Debug log
    if (urlToken) {
      setToken(urlToken);
    } else {
      setMessage('Invalid reset link. Please request a new password reset.');
    }
  }, [searchParams]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage('');
    setSuccessMessage('');
    
    if (!token) {
      setMessage('Invalid reset token. Please request a new password reset.');
      return;
    }

    if (!validateForm()) {
      setMessage('Please fix the errors below before submitting.');
      return;
    }

    setLoading(true);

    try {
      console.log('Sending reset password request with token:', token); // Debug log
      const response = await axios.post(`http://localhost:5050/api/users/reset-password-with-token?token=${token}`, {
        newPassword: formData.password
      });
      
      console.log('Reset password response:', response.data); // Debug log
      
      if (response.data.success) {
        setSuccessMessage('Password reset successfully! You can now login with your new password.');
        setFormData({ password: '', confirmPassword: '' });
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage(response.data.message || 'Failed to reset password. Please try again.');
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
            {/* Debug info - remove in production */}
            {token && (
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}>
                <strong>Debug:</strong> Token from URL: {token.substring(0, 20)}...
              </div>
            )}
            
            <h2 className="card-title text-center mb-4">Reset Password</h2>
            <p className="text-muted text-center mb-4">
              Enter your new password below.
            </p>
            
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
                <div className="mt-2">
                  <small>Redirecting to login page...</small>
                </div>
              </div>
            )}

            {token && !successMessage && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your new password"
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
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback d-block">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Resetting Password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}

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

export default ResetPassword;
