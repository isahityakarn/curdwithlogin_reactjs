import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import logo from '../images/header1/msde111.png';

// import statelogo from '../images/header1/statelogo.png';
import qrImg from '../images/header/qr.jpeg';
import logo from '../images/header1/header.png';
import dataForNOC from './noc.json';


export default function generateNocPdf() {
  const cert = dataForNOC.certificate || {};
  const doc = new jsPDF();
  const headerY = 10;
  const fixedHeight = 22;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Draw header background
  doc.setFillColor(189, 211, 223); // light blue
  doc.rect(0, 0, pageWidth, 26, 'F');

  // Draw logo (centered horizontally and vertically in header)
  const logoWidth = 200;
  const logoHeight = 22;
  const headerHeight = 22;
  const logoX = pageWidth / 2 - logoWidth / 2;
  const logoY = (headerHeight - logoHeight) / 2;
  doc.addImage(logo, 'JPEG', logoX, logoY, logoWidth, logoHeight);

  // English text (left)
  // doc.setFont('helvetica', 'bold');
  // doc.setFontSize(15);
  // doc.text('Directorate Technical Education', 12, 14);
  // doc.setFont('helvetica', 'normal');
  // doc.setFontSize(10);
  // doc.text('Government of Madhya Pradesh', 12, 22);

  // Hindi text (right)
  // doc.setFont('times', 'bold');
  // doc.setFontSize(18);
  // doc.text('तकनीकी शिक्षा संचालनालय', pageWidth - 12, 14, { align: 'right' });
  // doc.setFont('times', 'normal');
  // doc.setFontSize(12);
  // doc.text('मध्यप्रदेश शासन', pageWidth - 12, 22, { align: 'right' });

  // Continue with the rest of the PDF content
  // doc.setDrawColor(180);
  // doc.setLineWidth(0.5);
  // doc.line(10, headerY + fixedHeight + 2, pageWidth - 10, headerY + fixedHeight + 2);

  const titleY = headerY + fixedHeight + 10;
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('No Objection Certificate', pageWidth / 2, titleY, { align: 'center' });
  doc.setFont(undefined, 'normal');
  doc.setFontSize(10);
    // Add today's date on the right side of the header
    const todayHeader = new Date();
    const dateHeaderStr = todayHeader.getDate().toString().padStart(2, '0') + '/' +
      (todayHeader.getMonth() + 1).toString().padStart(2, '0') + '/' + todayHeader.getFullYear();
    doc.setFontSize(12);
    doc.text('Date: ' + dateHeaderStr, pageWidth - 12, titleY, { align: 'right' });
  doc.text(
    `This is to certify that the State/UT Directorate has no objection to ${cert.institute_name || ''}, located at ${cert.complete_address || ''}, applying under Category: ${cert.category || ''} for affiliation with the Directorate General of Training (DGT), New Delhi for the following trade(s) and unit(s) subject to fulfillment of DGT affiliation norms:`,
    10, titleY + 10, { maxWidth: 190 }
  );
  let y = titleY + 30;
  autoTable(doc, {
    startY: y,
    body: [
      [
        { content: 'Name of the Organization:', styles: { fontStyle: 'bold' } },
        cert.institute_name || ''
      ],
      [
        { content: 'Full Address of the Institute*: ', styles: { fontStyle: 'bold' } },
        cert.complete_address || ''
      ],  
        
      [
        { content: 'Application Number/MIS Code:', styles: { fontStyle: 'bold' } },
        (cert.application_number || '') + (cert.mis_code ? ' / ' + cert.mis_code : '')
      ],
      [
        { content: 'Category of Application:', styles: { fontStyle: 'bold' } },
        cert.category || ''
      ],
    ],
    theme: 'grid',
    styles: { fontSize: 11, cellPadding: 3 },
    columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 100 } },
    didParseCell: function (data) {
      if (data.row.index === 1 && data.column.index === 0) {
        data.cell.text = ['Full Address of the Institute*:'];
        data.cell.styles.fontStyle = 'bold';
      }
      if (data.row.index === 2 && data.column.index === 0) {
        data.cell.styles.fontStyle = 'bold';
      }
      if (data.row.index === 3 && data.column.index === 0) {
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  y = doc.lastAutoTable.finalY + 2;
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

  // Signature, State Director, and Date on the far right (minimal right space)
  const rightPadding = 10;
  const rightX = pageWidth - rightPadding;
  const imgUrl = `/header/${cert.signature}`;
  doc.addImage(imgUrl, 'PNG', rightX - 40, y, 40, 18); // align image right edge
  y += 19;
  doc.setFont(undefined, 'bold');
  doc.text('Signature', rightX, y, { align: 'right' });
  y += 10;
  doc.setFont(undefined, 'bold');
  doc.text(cert.state_director || '', rightX, y, { align: 'right' });
  doc.setFont(undefined, 'normal');
  doc.text(`State Director, (${cert.state_name || ''})`, rightX, y + 8, { align: 'right' });
  y += 20;
  // Show current date
  const today = new Date();
  const dateStr = today.getDate().toString().padStart(2, '0') + '/' +
    (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getFullYear();
  doc.text('Date: ' + dateStr, rightX, y, { align: 'right' });
  doc.save('No_Objection_Certificate.pdf');
}