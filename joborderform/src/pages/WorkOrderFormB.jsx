import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const WorkOrderForm = () => {
  const [formData, setFormData] = useState({
    workOrderNo: '',
    buyer: '',
    date: '',
    orderNo: '',
    deliveryDetails: '',
    komori: false,
    fuji: false,
    cf: false,
    newOrder: false,
    repeatOrder: false,
    workDetails: [
      { description: '', pagesPerBook: '', quantity: '', bindingType: '', sheetSize: '', noOfSheets: '', finalWorkSize: '' }
    ],
    workAndTurn: false,
    workAndTumble: false,
    paperDetails: [
      { type: '', colour: '', gsm: '', perforation: '', inkFront: '', inkBack: '', numberingFrom: '', numberingTo: '' }
    ],
    oldStockDetails: {
      availableStock: '',
      totalPrinted: '',
      balanceIncldStock: ''
    },
    binderyServices: {
      folding: false,
      gathering: false,
      trimScore: false,
      staple: false,
      dieCutting: false,
      lamination: false
    },
    specialInstruction: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleWorkDetailsChange = (index, field, value) => {
    const newWorkDetails = [...formData.workDetails];
    newWorkDetails[index][field] = value;
    setFormData(prevData => ({
      ...prevData,
      workDetails: newWorkDetails
    }));
  };

  const handlePaperDetailsChange = (index, field, value) => {
    const newPaperDetails = [...formData.paperDetails];
    newPaperDetails[index][field] = value;
    setFormData(prevData => ({
      ...prevData,
      paperDetails: newPaperDetails
    }));
  };

  const generatePDF = () => {
    const input = document.getElementById('workOrderForm');
    if (!input) {
      console.error('Could not find element with id "workOrderForm"');
      return;
    }

    // Temporarily make the div visible
    input.classList.remove('hidden');

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('work_order.pdf');

      // Hide the div again
      input.classList.add('hidden');
    }).catch(err => {
      console.error('Error generating PDF:', err);
      // Hide the div if there's an error
      input.classList.add('hidden');
    });
  };

  const handlePrint = () => {
    const printContent = document.getElementById('workOrderForm');
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 grid grid-cols-2 gap-4">
        <input
          type="text"
          name="workOrderNo"
          value={formData.workOrderNo}
          onChange={handleInputChange}
          placeholder="Work Order No."
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="buyer"
          value={formData.buyer}
          onChange={handleInputChange}
          placeholder="Buyer"
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="orderNo"
          value={formData.orderNo}
          onChange={handleInputChange}
          placeholder="Order No."
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="deliveryDetails"
          value={formData.deliveryDetails}
          onChange={handleInputChange}
          placeholder="Delivery Details"
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="mr-4">
          <input
            type="checkbox"
            name="komori"
            checked={formData.komori}
            onChange={handleInputChange}
          /> Komori
        </label>
        <label className="mr-4">
          <input
            type="checkbox"
            name="fuji"
            checked={formData.fuji}
            onChange={handleInputChange}
          /> Fuji
        </label>
        <label className="mr-4">
          <input
            type="checkbox"
            name="cf"
            checked={formData.cf}
            onChange={handleInputChange}
          /> CF
        </label>
        <label className="mr-4">
          <input
            type="checkbox"
            name="newOrder"
            checked={formData.newOrder}
            onChange={handleInputChange}
          /> New Order
        </label>
        <label>
          <input
            type="checkbox"
            name="repeatOrder"
            checked={formData.repeatOrder}
            onChange={handleInputChange}
          /> Repeat Order
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Work Details</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Description</th>
              <th className="border p-2">Pages Per Book</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Binding Type</th>
              <th className="border p-2">Sheet Size</th>
              <th className="border p-2">No. of Sheets</th>
              <th className="border p-2">Final Work Size</th>
            </tr>
          </thead>
          <tbody>
            {formData.workDetails.map((detail, index) => (
              <tr key={index}>
                {Object.keys(detail).map((key) => (
                  <td key={key} className="border p-2">
                    <input
                      type="text"
                      value={detail[key]}
                      onChange={(e) => handleWorkDetailsChange(index, key, e.target.value)}
                      className="w-full"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <label className="mr-4">
          <input
            type="checkbox"
            name="workAndTurn"
            checked={formData.workAndTurn}
            onChange={handleInputChange}
          /> Work & Turn
        </label>
        <label>
          <input
            type="checkbox"
            name="workAndTumble"
            checked={formData.workAndTumble}
            onChange={handleInputChange}
          /> Work & Tumble
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Paper Details</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Paper Type</th>
              <th className="border p-2">Paper Colour</th>
              <th className="border p-2">Paper GSM</th>
              <th className="border p-2">Perforation</th>
              <th className="border p-2">Ink Front</th>
              <th className="border p-2">Ink Back</th>
              <th className="border p-2">Numbering From</th>
              <th className="border p-2">Numbering To</th>
            </tr>
          </thead>
          <tbody>
            {formData.paperDetails.map((detail, index) => (
              <tr key={index}>
                {Object.keys(detail).map((key) => (
                  <td key={key} className="border p-2">
                    <input
                      type="text"
                      value={detail[key]}
                      onChange={(e) => handlePaperDetailsChange(index, key, e.target.value)}
                      className="w-full"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Old Stock Details</h3>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="availableStock"
            value={formData.oldStockDetails.availableStock}
            onChange={(e) => setFormData(prevData => ({
              ...prevData,
              oldStockDetails: { ...prevData.oldStockDetails, availableStock: e.target.value }
            }))}
            placeholder="Available Stock"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="totalPrinted"
            value={formData.oldStockDetails.totalPrinted}
            onChange={(e) => setFormData(prevData => ({
              ...prevData,
              oldStockDetails: { ...prevData.oldStockDetails, totalPrinted: e.target.value }
            }))}
            placeholder="Total Printed"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="balanceIncldStock"
            value={formData.oldStockDetails.balanceIncldStock}
            onChange={(e) => setFormData(prevData => ({
              ...prevData,
              oldStockDetails: { ...prevData.oldStockDetails, balanceIncldStock: e.target.value }
            }))}
            placeholder="Balance Incld Stock"
            className="border p-2 rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Bindery Services</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(formData.binderyServices).map((service) => (
            <label key={service}>
              <input
                type="checkbox"
                name={`binderyServices.${service}`}
                checked={formData.binderyServices[service]}
                onChange={(e) => setFormData(prevData => ({
                  ...prevData,
                  binderyServices: { ...prevData.binderyServices, [service]: e.target.checked }
                }))}
              /> {service.charAt(0).toUpperCase() + service.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2">Special Instruction</h3>
        <textarea
          name="specialInstruction"
          value={formData.specialInstruction}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          rows="3"
        ></textarea>
      </div>

    
      <div className="flex space-x-4 mb-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate PDF
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Print
        </button>
      </div>


            {/* pdf creation */}
      <div id="workOrderForm" className="mt-8 border p-4 w-[210mm] h-[297mm] hidden">
        <div className="text-center font-bold text-xl mb-4">
          <div>INTERNATIONAL PRINTING PRESS</div>
          <div>Mekozhoor, Phone 0468 2276076</div>
        </div>

        <div className="border-2 border-black p-2 mb-4">
          <div className="text-center font-bold text-lg">WORK ORDER</div>
          <div className="flex justify-between">
            <div>No. {formData.workOrderNo}</div>
            <div className="flex space-x-4">
              <label><input type="checkbox" checked={formData.komori} readOnly /> Komori</label>
              <label><input type="checkbox" checked={formData.fuji} readOnly /> Fuji</label>
              <label><input type="checkbox" checked={formData.cf} readOnly /> CF</label>
            </div>
            <div className="flex space-x-4">
              <label><input type="checkbox" checked={formData.newOrder} readOnly /> New order</label>
              <label><input type="checkbox" checked={formData.repeatOrder} readOnly /> Repeat Order</label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>BUYER: {formData.buyer}</div>
          <div>DATE: {formData.date}</div>
          <div>ORDER NO: {formData.orderNo}</div>
        </div>

        <div className="mb-4">
          <div className="font-bold">WORK DETAILS</div>
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black p-1">SL NO</th>
                <th className="border border-black p-1">DESCRIPTION</th>
                <th className="border border-black p-1">PAGES PER BOOK</th>
                <th className="border border-black p-1">QUANTITY</th>
                <th className="border border-black p-1">BINDING TYPE</th>
                <th className="border border-black p-1">SHEET SIZE</th>
                <th className="border border-black p-1">NO OF SHEETS</th>
                <th className="border border-black p-1">FINAL WORK SIZE</th>
              </tr>
            </thead>
            <tbody>
              {formData.workDetails.map((detail, index) => (
                <tr key={index}>
                  <td className="border border-black p-1">{index + 1}</td>
                  <td className="border border-black p-1">{detail.description}</td>
                  <td className="border border-black p-1">{detail.pagesPerBook}</td>
                  <td className="border border-black p-1">{detail.quantity}</td>
                  <td className="border border-black p-1">{detail.bindingType}</td>
                  <td className="border border-black p-1">{detail.sheetSize}</td>
                  <td className="border border-black p-1">{detail.noOfSheets}</td>
                  <td className="border border-black p-1">{detail.finalWorkSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-start space-x-8 mb-4">
          <label><input type="checkbox" checked={formData.workAndTurn} readOnly /> Work & Turn</label>
          <label><input type="checkbox" checked={formData.workAndTumble} readOnly /> Work & Tumble</label>
        </div>

        <div className="mb-4">
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black p-1">SL NO</th>
                <th className="border border-black p-1">PAPER TYPE</th>
                <th className="border border-black p-1">PAPER COLOUR</th>
                <th className="border border-black p-1">PAPER GSM</th>
                <th className="border border-black p-1">PERFORATION</th>
                <th className="border border-black p-1">INK FRONT</th>
                <th className="border border-black p-1">INK BACK</th>
                <th className="border border-black p-1 text-center" colSpan="2">NUMBERING</th>
              </tr>
            </thead>
            <tbody>
              {formData.paperDetails.map((detail, index) => (
                <tr key={index}>
                  <td className="border border-black p-1">{index + 1}</td>
                  <td className="border border-black p-1">{detail.type}</td>
                  <td className="border border-black p-1">{detail.colour}</td>
                  <td className="border border-black p-1">{detail.gsm}</td>
                  <td className="border border-black p-1">{detail.perforation}</td>
                  <td className="border border-black p-1">{detail.inkFront}</td>
                  <td className="border border-black p-1">{detail.inkBack}</td>
                  <td className="border border-black p-1">{detail.numberingFrom}</td>
                  <td className="border border-black p-1">{detail.numberingTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="font-bold">OLD STOCK DETAILS</div>
            <div>AVAILABLE STOCK: {formData.oldStockDetails.availableStock}</div>
            <div>TOTAL PRINTED: {formData.oldStockDetails.totalPrinted}</div>
            <div>BALANCE INCLD STOCK: {formData.oldStockDetails.balanceIncldStock}</div>
          </div>
          <div>
            <div className="font-bold">BINDERY SERVICES</div>
            <div className="grid grid-cols-2">
              <label><input type="checkbox" checked={formData.binderyServices.folding} readOnly /> Folding</label>
              <label><input type="checkbox" checked={formData.binderyServices.gathering} readOnly /> Gathering</label>
              <label><input type="checkbox" checked={formData.binderyServices.trimScore} readOnly /> Trim/Score</label>
              <label><input type="checkbox" checked={formData.binderyServices.staple} readOnly /> Staple</label>
              <label><input type="checkbox" checked={formData.binderyServices.dieCutting} readOnly /> Die Cutting</label>
              <label><input type="checkbox" checked={formData.binderyServices.lamination} readOnly /> Lamination</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="font-bold">SPECIAL INSTRUCTION</div>
          <div className="border border-black p-2 min-h-[50px]">{formData.specialInstruction}</div>
        </div>

        <div className="flex justify-between mt-8">
          <div>
            <div className="font-bold">FOR INTERNATIONAL PRINTING PRESS</div>
            <div className="mt-8">SALES EXECUTIVE</div>
          </div>
          <div>
            <div className="font-bold">FOR BUYER</div>
            <div className="mt-8">AUTHORISED SIGNATORY</div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default WorkOrderForm;