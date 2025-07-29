import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h4>Welcome back, {user?.name}!</h4>
                  <p className="text-muted">
                    You have successfully logged into your account.
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title">User Information</h5>
                      <div className="row">
                        <div className="col-sm-4">
                          <strong>Name:</strong>
                        </div>
                        <div className="col-sm-8">
                          {user?.name}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-4">
                          <strong>Email:</strong>
                        </div>
                        <div className="col-sm-8">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card text-white bg-info">
                    <div className="card-body">
                      <h5 className="card-title">Profile</h5>
                      <p className="card-text">Manage your profile settings and preferences.</p>
                      <button className="btn btn-light btn-sm">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-success">
                    <div className="card-body">
                      <h5 className="card-title">Tasks</h5>
                      <p className="card-text">View and manage your tasks and projects.</p>
                      <button className="btn btn-light btn-sm">
                        View Tasks
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-warning">
                    <div className="card-body">
                      <h5 className="card-title">Settings</h5>
                      <p className="card-text">Configure your account settings and security.</p>
                      <button className="btn btn-light btn-sm">
                        View Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="card border-primary">
                    <div className="card-header bg-primary text-white">
                      <h5 className="card-title mb-0">Recent Activity</h5>
                    </div>
                    <div className="card-body">
                      <div className="list-group list-group-flush">
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Logged in successfully</h6>
                            <p className="mb-1 text-muted">Welcome back to your dashboard</p>
                            <small className="text-muted">Just now</small>
                          </div>
                          <span className="badge bg-success rounded-pill">Success</span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">Account created</h6>
                            <p className="mb-1 text-muted">Your account has been successfully created</p>
                            <small className="text-muted">Earlier today</small>
                          </div>
                          <span className="badge bg-info rounded-pill">Info</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
