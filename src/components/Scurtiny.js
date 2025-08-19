import React from 'react';
import './Scurtiny.css';

const Scurtiny = () => {
  return (
    <div className="scurtiny-report">
      <table className="report-table">
        <thead>
          <tr>
            <th colSpan="5" style={{ background: '#d3d3d3', fontSize: '17px', padding: 0 }}>
              ITI NAME Along with Address 
            </th>
            <th colSpan="2" style={{ background: '#d3d3d3', fontSize: '17px', padding: 0 }}>
               Application Timeline
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Application No.</th>
            <td style={{ width: '220px' }}>MIS Code (If Available)</td>
            <th>State</th>
            <th>Type of application</th>
            <th>Grading</th>
            <th colSpan={2}>Session</th>
          
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>UTTAR PRADES</td>
            <td colSpan={2}>Category of Application(New/Existing)</td>
            <td></td>
           
          </tr>
          <tr>
            <td colSpan="7" className="section-title">Member of Inspection cumverification committee (ICVC )/Report Submitted On NIMI PORTAL</td>
          </tr>
          <tr>
            <td rowSpan={2}>Inspection Details</td>
            <td colSpan={5}>Member of Inspection cumverification committee (ICVC )/Report Submitted On NIMI PORTAL</td>
            
            <td rowSpan={2}>Date of Inspection</td>
         
          </tr>
          <tr>
           
            <td>NCVT</td>
            <td>SCVT</td>
            <td>NODAL</td>
            <td>INST.</td>
            <td>IND.</td>
           
         
          </tr>
          <tr>
              <td>Name</td>
            <td>Name, Contact No.</td>
            <td>Name, Contact No.</td>
            <td>Name, Contact No.</td>
            <td>Name, Contact No.</td>
            <td>Name, Contact No.</td>
            <td rowSpan={2}>DD/MM/YY</td>
          
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
            <th colSpan="3" className="">Existing Trade Units Affiliation as per NCVT portal/Affiliated Units</th>
             <td colSpan="4">Electrician - 6(2+2+2)<br/>Fitter - 6(2+2+2)</td>
          </tr>
        
          <tr>
            <td>Land as per norms</td>
            <td>Building as per norms</td>
            <td>Power connection as per norms</td>
            <td>Machinery as Per Norms</td>
            <td>IT Lab</td>
            <td colSpan={2}>Multipurpose Hall</td>
         
          </tr>
          <tr style={{ background: '#ffff66' }}>
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
            <td>YES/NO (Remark Option)</td>
            <td colSpan={2}>YES/NO (Remark Option)</td>

          </tr>
        </tbody>
      </table>

      <h3 className="section-title" style={{ background: '#d3d3d3', marginTop: '20px' }}>Remarks of ICVC Committee</h3>
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

      <h3 className="section-title" style={{ background: '#d3d3d3', marginTop: '20px' }}>Remarks of TC Section</h3>
      <div className="remark-option" style={{ background: '#ffff66', padding: '10px' }}>Remark Option</div>
    </div>
  );
};

export default Scurtiny;
