import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../images/header/lo.jpg'; // Adjust the path as necessary

// Optionally, you can use a library to generate QR codes as base64, or use a static QR code image
// For demonstration, let's use a static QR code image import (replace with dynamic if needed)
import qrImg from '../images/header/qr.jpeg'; // Place a QR code image in this path

export default function generateNocPdf(nocData) {
  const cert = nocData.certificate || {};
  const doc = new jsPDF();
  const yStart = 20;

  // Beautiful header: logo left, QR right
  const headerY = 10;
  const logoWidth = 120;
  const logoHeight = 18;
  const qrWidth = 24;
  const qrHeight = 24;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Draw logo (left)
  try {
    doc.addImage(logo, 'JPEG', 10, headerY, logoWidth, logoHeight);
  } catch (e) {}

  // Draw QR code (right)
  try {
    doc.addImage(qrImg, 'PNG', pageWidth - qrWidth - 10, headerY, qrWidth, qrHeight);
  } catch (e) {}

  // Draw a line under the header
  doc.setDrawColor(180);
  doc.setLineWidth(0.5);
  doc.line(10, headerY + Math.max(logoHeight, qrHeight) + 2, pageWidth - 10, headerY + Math.max(logoHeight, qrHeight) + 2);

  // Title below header
  const titleY = headerY + Math.max(logoHeight, qrHeight) + 10;
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('No Objection Certificate', pageWidth / 2, titleY, { align: 'center' });
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
  doc.text(
    `This is to certify that the State/UT Directorate has no objection to ${cert.institute_name || ''}, located at ${cert.complete_address || ''}, applying under <Category: ${cert.category || ''}> for affiliation with the Directorate General of Training (DGT), New Delhi for the following trade(s) and unit(s) subject to fulfillment of DGT affiliation norms:`,
    10, titleY + 10, { maxWidth: 190 }
  );
  let y = titleY + 30;
  doc.setFont(undefined, 'bold');
  doc.text('Name of the institute:', 10, y);
  doc.setFont(undefined, 'normal');
  doc.text(cert.institute_name || '_________________________________________', 60, y);
  y += 8;
  doc.setFont(undefined, 'bold');
  doc.text('Complete Address* of Institute:', 10, y);
  doc.setFont(undefined, 'normal');
  doc.text(cert.complete_address || '_________________________________________', 70, y);
  y += 8;
  doc.setFontSize(8);
  doc.text('(*Complete old and New Address of the institute in case of Shifting or Relocation of existing ITI)', 12, y);
  doc.setFontSize(10);
  y += 8;
  doc.text('Application Number/MIS code:', 10, y);
  doc.setFont(undefined, 'normal');
  doc.text((cert.application_number || '') + (cert.mis_code ? ' / ' + cert.mis_code : '') || '_________________________', 65, y);
  y += 8;
  doc.setFont(undefined, 'bold');
  doc.text('Category of application:', 10, y);
  y += 8;
  autoTable(doc, {
    startY: y,
    head: [['S. No.', 'Trade Name', 'Number of Units in Shift I', 'Number of Units in Shift II']],
    body: (cert.trades && cert.trades.length > 0)
      ? cert.trades.map((trade, idx) => [
          (idx + 1).toString(),
          trade.trade_name || '',
          trade.shift_1_units || '',
          trade.shift_2_units || ''
        ])
      : [
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
}