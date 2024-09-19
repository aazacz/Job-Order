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
    doc.setFontSize(16);
    doc.rect(10, 30, 44, 10);      // Box for order number
    doc.setFont("helvetica", "bold");
    doc.text('WORK ORDER', 12, 37);

    // Work Order Number
    doc.setFontSize(12);
    doc.text('No.', 62, 37);
    // doc.rect(170, 15, 30, 10); // Box for order number

    // "For" section with checkboxes
    // doc.text('For', 180, 30);
    doc.rect(120, 30, 5, 5); // Komori checkbox
    doc.setFont("helvetica", "bold");
    doc.text('Komori', 128, 34);

    doc.rect(150, 30, 5, 5); // Fuji checkbox
    doc.setFont("helvetica", "bold");
    doc.text('Fuji', 158, 34);
    
    doc.rect(170, 30, 5, 5); // Fuji checkbox
    doc.setFont("helvetica", "bold");
    doc.text('CF', 178, 34);

    doc.setFont("helvetica", "normal");
    doc.rect(120, 40, 5, 5); // New Order checkbox
    doc.text('New order', 128, 45);

    doc.rect(150, 40, 5, 5); // Repeat Order checkbox
    doc.text('Repeat Order', 158, 45);

    // Buyer, Date, Order No., Delivery Details
    doc.rect(10, 50, 190, 10);
    doc.text('BUYER', 12, 55);
    doc.text('DATE', 90, 55);
    doc.text('ORDER NO.', 130, 55);
    doc.text('DELIVERY DETAILS', 160, 40);

    // Work Details Section
    // doc.setFontSize(10);
    // doc.rect(10, 50, 190, 30); 
    // doc.text('SL NO', 12, 55);
    // doc.text('DESCRIPTION', 30, 55);
    // doc.text('PAGES PER BOOK', 80, 55);
    // doc.text('QUANTITY', 110, 55);
    // doc.text('BINDING TYPE', 130, 55);
    // doc.text('SHEET SIZE', 150, 55);
    // doc.text('NO OF SHEETS', 170, 55);
    // doc.text('FINAL WORK SIZE', 190, 55);

    // Rows for Work Details
    // let y = 60;
    // for (let i = 0; i < 3; i++) {
    //   doc.line(10, y, 200, y); // Horizontal line
    //   doc.text(String(i + 1), 12, y + 5);
    //   y += 10;
    // }

    // Work & Turn, Work & Tumble Checkboxes
    // doc.rect(10, 85, 5, 5);
    // doc.text('Work & Turn', 17, 90);
    // doc.rect(50, 85, 5, 5);
    // doc.text('Work & Tumble', 57, 90);

    // Paper Section Table
    // y = 95;
    // doc.text('SL NO', 12, y);
    // doc.text('PAPER TYPE', 30, y);
    // doc.text('PAPER COLOUR', 60, y);
    // doc.text('PAPER GSM', 90, y);
    // doc.text('PERFORATION', 120, y);
    // doc.text('INK FRONT', 150, y);
    // doc.text('INK BACK', 170, y);
    // doc.text('NUMBERING', 190, y);

    // Rows for Paper Section
    // y = 100;
    // for (let i = 0; i < 3; i++) {
    //   doc.line(10, y, 200, y); // Horizontal line
    //   if (i === 0) {
    //     doc.text('FIRST COPY', 12, y + 5);
    //   } else if (i === 1) {
    //     doc.text('SECOND COPY', 12, y + 5);
    //   } else {
    //     doc.text('THIRD COPY', 12, y + 5);
    //   }
    //   y += 10;
    // }

    // Old Stock and Bindery Services
    // y = 135;
    // doc.rect(10, y, 90, 20); // Old Stock Details
    // doc.text('OLD STOCK DETAILS', 12, y + 5);
    // doc.text('AVAILABLE STOCK', 12, y + 10);
    // doc.text('TOTAL PRINTED', 50, y + 10);
    // doc.text('BALANCE INCLD STOCK', 120, y + 10);

    // Bindery Services Checkboxes
    // doc.rect(110, y, 90, 20); // Bindery Services
    // doc.text('BINDERY SERVICES', 112, y + 5);
    // doc.rect(112, y + 10, 5, 5);
    // doc.text('Folding', 120, y + 15);
    // doc.rect(140, y + 10, 5, 5);
    // doc.text('Gathering', 147, y + 15);
    // doc.rect(170, y + 10, 5, 5);
    // doc.text('Trim/Score', 177, y + 15);
    
    // doc.rect(112, y + 20, 5, 5);
    // doc.text('Staple', 120, y + 25);
    // doc.rect(140, y + 20, 5, 5);
    // doc.text('Die Cutting', 147, y + 25);
    // doc.rect(170, y + 20, 5, 5);
    // doc.text('Lamination', 177, y + 25);

    // Special Instruction
    // y = 160;
    // doc.rect(10, y, 190, 20);
    // doc.text('SPECIAL INSTRUCTION', 12, y + 5);

    // Footer
    // doc.text('FOR INTERNATIONAL PRINTING PRESS', 12, 200);
    // doc.text('FOR BUYER', 160, 200);
    // doc.text('SALES EXECUTIVE', 12, 210);
    // doc.text('AUTHORISED SIGNATORY', 160, 210);
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
