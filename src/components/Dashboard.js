import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  // PDF generation handler
  const handleCreatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Annexure-9: Format of No Objection Certificate', 10, 12);
    doc.setFont(undefined, 'bold');
    doc.text('No Objection Certificate', 80, 22);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(
      'This is to certify that the State/UT Directorate has no objection to <Name of the applicant ITI>, located at <Address of the institute>, applying under <Category: New ITI / Existing ITI - Addition of Trade Unit / Shifting or Relocation of Existing ITI> for affiliation with the Directorate General of Training (DGT), New Delhi for the following trade(s) and unit(s) subject to fulfillment of DGT affiliation norms:',
      10, 32, { maxWidth: 190 }
    );
    let y = 52;
    doc.setFont(undefined, 'bold');
    doc.text('Name of the institute:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text('_________________________________________', 60, y);
    y += 8;
    doc.setFont(undefined, 'bold');
    doc.text('Complete Address* of Institute:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text('_________________________________________', 70, y);
    y += 8;
    doc.setFontSize(8);
    doc.text('(*Complete old and New Address of the institute in case of Shifting or Relocation of existing ITI)', 12, y);
    doc.setFontSize(10);
    y += 8;
    doc.setFont(undefined, 'bold');
    doc.text('Application Number/MIS code:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text('_________________________', 65, y);
    y += 8;
    doc.setFont(undefined, 'bold');
    doc.text('Category of application:', 10, y);
    y += 8;
    // Table
    autoTable(doc, {
      startY: y,
      head: [['S. No.', 'Trade Name', 'Number of Units in Shift I', 'Number of Units in Shift II']],
      body: [
        ['1', '', '', ''],
        ['2', '', '', ''],
        ['3', '', '', ''],
        ['4', '', '', ''],
      ],
      theme: 'grid',
      headStyles: { fillColor: [200, 200, 200], textColor: 0, fontStyle: 'bold' },
      styles: { fontSize: 10 },
      columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 60 }, 2: { cellWidth: 50 }, 3: { cellWidth: 50 } },
    });
    y = doc.lastAutoTable.finalY + 6;
    doc.setFontSize(10);
    doc.text('Liabilities, if any, on this count shall be the sole responsibility of the Applicant. This No Objection Certificate is valid for a period of one year from the date of issuance.', 10, y, { maxWidth: 190 });
    y += 10;
    doc.text('The issuance of this NOC does not, in itself, guarantee the accreditation or affiliation of the institute. The institute must fully comply with all applicable norms, procedures, and guidelines as prescribed for affiliation and accreditation.', 10, y, { maxWidth: 190 });
    y += 18;
    doc.text('Signature', 10, y);
    doc.text('State Director, (State Name)', 120, y);
    y += 8;
    doc.text('Date', 10, y);
    doc.save('No_Objection_Certificate.pdf');
  };

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
                <div className="col-12 mb-3">
                  <button className="btn btn-outline-primary" onClick={handleCreatePDF}>
                    Create PDF (No Objection Certificate)
                  </button>
                </div>
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
