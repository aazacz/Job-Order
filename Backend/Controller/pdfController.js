const express = require('express');
const {createWorkOrderPDF} = require("../Helper/createJobOrder")


const generatepdf = async(req,res)=>{

    const data = req.body;
    try {
      const pdfPath = createWorkOrderPDF(data);
      res.json({ success: true, pdfPath });
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ success: false, error: 'Failed to generate PDF' });
    }
}
module.exports = {generatepdf}