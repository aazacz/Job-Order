import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const WorkOrderPDF = () => {
  const [pdfSrc, setPdfSrc] = useState(null);

  const createWorkOrderPDF = () => {
    const doc = new jsPDF({ format: "a4" });
   
    const pageWidth = doc.internal.pageSize.getWidth(); // 210mm in points
    const pageHeight = doc.internal.pageSize.getHeight(); // 297mm in points
    
    const data = {
      buyer: 'John Doe',
      date: '2023-09-18',
      orderNo: 'ORD123',
      deliveryDetails: 'Express Delivery',
      workDetails: [
        ['1', 'Book printing', '100', '1000', 'Perfect', 'A4', '100', '210x297mm'],
      ],
    };

    // Add logo and title (use a base64 encoded image or external URL)
    doc.setFont('helvetica','bold');
    doc.setFontSize(14);
    doc.text('INTERNATIONAL PRINTING PRESS',pageWidth / 2, 14, {align: 'center'});
    doc.text('Mekozhoor, Phone 0468 2276076', 50, 22);

    // Add form fields
    doc.text('BUYER:', 16, 46);
    doc.text(data.buyer, 40, 46);

    doc.text('DATE:', 16, 56);
    doc.text(data.date, 40, 56);

    doc.text('ORDER NO.:', 76, 56);
    doc.text(data.orderNo, 100, 56);

    doc.text('DELIVERY DETAILS:', 136, 56);
    doc.text(data.deliveryDetails, 170, 56);

    // Work Details table
    doc.autoTable({
      startY: 65,
      head: [['SL NO', 'DESCRIPTION', 'PAGES PER BOOK', 'QUANTITY', 'BINDING TYPE', 'SHEET SIZE', 'NO OF SHEETS', 'FINAL WORK SIZE']],
      body: data.workDetails,
      theme: 'grid',
    });

    // Convert PDF to Data URL and display it in an iframe
    const pdfURI = doc.output('datauristring');
    setPdfSrc(pdfURI);
  };

  return (
    <div>
      <button onClick={createWorkOrderPDF}>Generate PDF</button>
      {pdfSrc && (
        <iframe
          src={pdfSrc}
          width="100%"
          height="600px"
          title="PDF Preview"
        ></iframe>
      )}
    </div>
  );
};



export default WorkOrderPDF;
;
