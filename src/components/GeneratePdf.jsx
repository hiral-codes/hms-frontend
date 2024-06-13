import React from 'react';
import { jsPDF } from 'jspdf';

const GeneratePdf = ({leave,user}) => {
  const generatePdf = () => {
    const doc = new jsPDF('portrait');

    // Add logo
    const img = new Image();
    img.src = "/logo.jpg"; // Replace with your image path
    doc.addImage(img, 'PNG', 10, 10, 50, 50);

    // Title
    doc.setFontSize(24);
    doc.text('LEAVE', 150, 20, { align: 'right' });
    doc.text('APPROVAL', 150, 35, { align: 'right' });

    // Application details
    doc.setFontSize(12);
    doc.text(`Application No : ${leave._id}`, 150, 50, { align: 'right' });
    doc.text(`${leave.creaatedAt}`, 150, 60, { align: 'right' });

    // Approved to
    doc.setFontSize(14);
    doc.text('APPROVED TO', 10, 70);
    doc.setFontSize(12);
    doc.text(`${user.name}`, 10, 80);
    doc.text(`${user.mobile}`, 10, 90);
    doc.text(`${user.branch} - ${user.semester}`, 10, 100);

    // Leave details
    doc.setFontSize(14);
    doc.text('Leave Details', 10, 120);
    doc.setFontSize(12);
    doc.text('Reason', 10, 130);
    doc.text(`${leave.reason}`, 80, 130);
    doc.text('Approved By', 10, 140);
    doc.text('Principal', 80, 140);
    doc.text('Duration', 10, 150);
    doc.text(`${leave.start} To ${leave.start}`, 80, 150);
    doc.text('Parents Mobile', 10, 160);
    doc.text(`${leave.parent_mobile}`, 80, 160);
    doc.text('Address', 10, 170);
    doc.text(`${user.address}`, 80, 170);

    // Footer
    doc.setFontSize(12);
    doc.text('S.S AGRWAL COLLEGE', 10, 270);
    doc.text('Devina Park Society, Gandevi Rd,', 10, 280);
    doc.text('Navsari, Gujarat 396445', 10, 290);
    doc.text('Phone: 02637 232 667', 10, 300);

    // Principal's signature
    doc.addImage(signatureBase64, 'PNG', 150, 260, 40, 20);
    doc.text('Principal', 160, 285);
    doc.text('SSAIET, Navsari', 160, 295);
    doc.save('Leave_Approval.pdf');
  };

  return (
    <div>
      <button onClick={generatePdf}>Download Leave Approval PDF</button>
    </div>
  );
};

export default GeneratePdf;
