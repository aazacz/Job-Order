    const fs = require('fs');
    const path = require('path');
    const { jsPDF } = require('jspdf');
    require('jspdf-autotable');

    // Read the logo image as binary data
    const logoPath = path.join(__dirname, '../public/logo.PNG');
    const logo = fs.readFileSync(logoPath, 'base64'); // Convert to base64 to use in jsPDF

    function createWorkOrderPDF(data) {
    const doc = new jsPDF();

    // Add logo and title
    doc.addImage(logo, 'PNG', 10, 10, 30, 10); // Since it's base64 now
    doc.setFontSize(16);
    doc.text('INTERNATIONAL PRINTING PRESS', 50, 15);
    doc.setFontSize(10);
    doc.text('Mekozhoor, Phone 0468 2276076', 50, 22);

    // Add form header
    doc.setFontSize(14);
    doc.text('WORK ORDER', 14, 35);

    // Add checkboxes and text
    doc.rect(120, 30, 4, 4);
    doc.text('Komori', 125, 33);
    doc.rect(150, 30, 4, 4);
    doc.text('Fuji', 155, 33);
    doc.rect(180, 30, 4, 4);
    doc.text('CF', 185, 33);

    // Add more form elements
    doc.rect(120, 36, 4, 4);
    doc.text('New order', 125, 39);
    doc.rect(150, 36, 4, 4);
    doc.text('Repeat Order', 155, 39);

    // Add circle and rounded rectangle
    doc.circle(50, 50, 10, 'S'); // Circle with a stroke
    doc.roundedRect(70, 50, 60, 30, 10, 10, 'S'); // Rounded rectangle

    // Add a rectangle with a background color
    doc.setFillColor(255, 100, 100); // Set fill color to light red
    doc.rect(20, 70, 80, 30, 'F'); // Filled rectangle with background color

    // Add form fields
    doc.rect(14, 40, 182, 10);
    doc.text('BUYER:', 16, 46);
    doc.text(data.buyer || '', 40, 46);

    doc.rect(14, 50, 60, 10);
    doc.text('DATE:', 16, 56);
    doc.text(data.date || '', 40, 56);

    doc.rect(74, 50, 60, 10);
    doc.text('ORDER NO.:', 76, 56);
    doc.text(data.orderNo || '', 100, 56);

    doc.rect(134, 50, 62, 10);
    doc.text('DELIVERY DETAILS:', 136, 56);
    doc.text(data.deliveryDetails || '', 170, 56);

    // Work Details table
    doc.autoTable({
        startY: 65,
        head: [['SL NO', 'DESCRIPTION', 'PAGES PER BOOK', 'QUANTITY', 'BINDING TYPE', 'SHEET SIZE', 'NO OF SHEETS', 'FINAL WORK SIZE']],
        body: data.workDetails || [],
        theme: 'grid',
    });

    // Move the PDF buffer creation after content has been added
    const pdfBuffer = doc.output('arraybuffer');
    
    // Save the PDF
    const fileName = `work_order_${data.orderNo}.pdf`;
    const filePath = path.join(__dirname, 'pdfs', fileName);

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write the PDF to a file
    fs.writeFileSync(filePath, Buffer.from(pdfBuffer));

    console.log(`PDF saved to: ${filePath}`);
    return filePath;
    }

    // Example usage:
    const sampleData = {
    buyer: 'John Doe',
    date: '2023-09-18',
    orderNo: 'ORD123',
    deliveryDetails: 'Express Delivery',
    workDetails: [
        ['1', 'Book printing', '100', '1000', 'Perfect', 'A4', '100', '210x297mm'],
    ],
    };

    const savedFilePath = createWorkOrderPDF(sampleData);
    console.log(`PDF was saved to: ${savedFilePath}`);

    module.exports = { createWorkOrderPDF };
