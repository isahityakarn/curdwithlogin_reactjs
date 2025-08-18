import React from 'react';
import './Scurtiny.css';

const Scurtiny = () => {
    console.log("hello");
    
  return (
    <div className="scurtiny-report">
      <h2 className="report-title">ITI NAME Along with Address</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th colSpan="6">Application Timeline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Application No.</td>
            <td>MIS Code (If Available)</td>
            <td>State</td>
            <td>Type of application</td>
            <td>Grading</td>
            <td>Session</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>UTTAR PRADES</td>
            <td>Category of Application(New/Existing)</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="6" className="section-title">Member of Inspection cumverification committee (ICVC )/Report Submitted On NIMI PORTAL</td>
          </tr>
          <tr>
            <td>NCVT</td>
            <td>SCVT</td>
            <td>NODAL</td>
            <td>INST.</td>
            <td>IND.</td>
            <td>Date of Inspection</td>
          </tr>
          <tr>
            <td>Name, Contact No.</td>
            <td>Name, Contact No.</td>
            <td>Name, Contact No.</td>
            <td>Name, Contact No.</td>
            <td>Name, Contact No.</td>
            <td>DD/MM/YY</td>
          </tr>
          <tr>
            <td>Report submitted</td>
            <td>yes/no (View Report)</td>
            <td>yes/no (View Report)</td>
            <td>yes/no (View Report)</td>
            <td>yes/no (View Report)</td>
            <td>yes/no (View Report)</td>
          </tr>
          <tr>
            <td colSpan="6" className="section-title">Existing Trade Units Affiliation as per NCVT portal/Affiliated Units</td>
          </tr>
          <tr>
            <td colSpan="6">Electrician - 6(2+2+2)<br/>Fitter - 6(2+2+2)</td>
          </tr>
          <tr>
            <td>Land as per norms</td>
            <td>Building as per norms</td>
            <td>Power connection as per norms</td>
            <td>Machinery as Per Norms</td>
            <td>IT Lab</td>
            <td>Multipurpose Hall</td>
          </tr>
          <tr className="highlight-row">
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
          </tr>
        </tbody>
      </table>

      <h3 className="section-title">Remarks of ICVC Committee</h3>
      <table className="report-table">
        <thead>
          <tr>
            <th>Trade Name</th>
            <th>NCVT</th>
            <th>SCVT</th>
            <th>3rd Member</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Trade-1 4(1+1)</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
          </tr>
          <tr>
            <td>Trade-2 8(2+2)</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
          </tr>
          <tr>
            <td>Trade-3</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
            <td>Recommended/Not Recommended<br/>Other Remarks also</td>
          </tr>
        </tbody>
      </table>

      <h3 className="section-title">Remarks of TC Section</h3>
      <div className="remark-option">Remark Option</div>
    </div>
  );
};

export default Scurtiny;
