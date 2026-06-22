import React, { useState } from "react";
import "./Billform.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import InvoicePreview from "./InvoicePreview";

function BillForm() {
  const [formData, setFormData] = useState({
    billDate: new Date().toISOString().split("T")[0],
    invoiceNumber: "",
    customerName: "",
    customerMobile: "",
    bookingId: "",
    startKm: "",
    endKm: "",
    totalKm: "",
    tripType: "",
    tripRate: "",
    toll: "",
    parking: "",
    extraHours: "",
    extraKm: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    lastReceiveAmount: "",
  });
  

  const generatePDF = async () => {
    const invoice = document.getElementById("invoice");

    if (!invoice) {
      alert("Invoice Preview not found!");
      return;
    }

    const canvas = await html2canvas(invoice, {
      scale:1.3 ,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png",0.5);

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;


    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `Invoice-${formData.invoiceNumber || "Bill"}.pdf`
    );
  };

//   function handleChange(e) {
//     const { name, value } = e.target;

//     if (name === "customerName") {
//       setFormData({
//         ...formData,
//         customerName: value.replace(
//           /[^A-Za-z\s]/g,
//           ""
//         ),
//       });
//       return;
//     }

//     if (name === "customerMobile") {
//       setFormData({
//         ...formData,
//         customerMobile: value
//           .replace(/\D/g, "")
//           .slice(0, 10),
//       });
//       return;
//     }

//     if (name === "bookingId") {
//      setFormData({
//   ...formData,
//   bookingId: value.replace(/[^0-9A-Za-z#-]/g, ""),
// });
// return;
//     }

//     if (name === "startKm" || name === "endKm") {
//       const updated = {
//         ...formData,
//         [name]: value,
//       };

//       updated.totalKm =
//         Number(updated.endKm || 0) -
//         Number(updated.startKm || 0);

//       setFormData(updated);
//       return;
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   }



function handleChange(e) {
  const { name, value } = e.target;

  // Negative values not allowed
  const numberFields = [
    "invoiceNumber",
    "startKm",
    "endKm",
    "tripRate",
    "extraKm",
    "extraHours",
    "toll",
    "parking",
    "lastReceiveAmount",
  ];

  if (numberFields.includes(name)) {
    if (Number(value) < 0) {
      alert("Negative values are not allowed");
      return;
    }
  }

  // Customer Name Validation
  if (name === "customerName") {
    if (/[^A-Za-z\s]/.test(value)) {
      alert("Customer name should contain only letters");
    }

    setFormData({
      ...formData,
      customerName: value.replace(/[^A-Za-z\s]/g, ""),
    });
    return;
  }

  // Mobile Validation
  if (name === "customerMobile") {
    const mobile = value.replace(/\D/g, "").slice(0, 10);

    if (value && /\D/.test(value)) {
      alert("Only numbers allowed in mobile number");
    }

    setFormData({
      ...formData,
      customerMobile: mobile,
    });
    return;
  }

  // Booking ID Validation
if (name === "bookingId") {
  if (/[A-Za-z]/.test(value)) {
    alert("Booking ID cannot contain letters");
  }

  setFormData({
    ...formData,
    bookingId: value.replace(/[A-Za-z\s]/g, ""), // removes letters and spaces
  });

  return;
}


  // Date Validation
  if (name === "endDate") {
    if (
      formData.startDate &&
      value &&
      new Date(value) < new Date(formData.startDate)
    ) {
      alert("End Date cannot be before Start Date");
      return;
    }
  }

  if (name === "startKm" || name === "endKm") {
  // Negative not allowed
  if (Number(value) < 0) {
    alert("KM cannot be negative");
    return;
  }

  const updated = {
    ...formData,
    [name]: value,
  };

  const startKm = Number(updated.startKm || 0);
  const endKm = Number(updated.endKm || 0);
  updated.totalKm = endKm - startKm;

  setFormData(updated);
  return;
}
  // Default
  setFormData({
    ...formData,
    [name]: value,
  });
}

  function handleSubmit(e) {
    e.preventDefault();
    generatePDF();
  }

  return (
    <div className="container">
      <h2>Bill Generation Form</h2>

      <form onSubmit={handleSubmit}>
        <label>Bill Date</label>
        <input
          type="date"
          name="billDate"
          value={formData.billDate}
          onChange={handleChange}
        />

        <label>Invoice Number</label>
        <input
          type="number"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
        />

        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
        />

        <label>Customer Mobile</label>
        <input
          type="number"
          name="customerMobile"
          value={formData.customerMobile}
          onChange={handleChange}
        />

        <label>Booking ID</label>
        <input
          type="text"
          name="bookingId"
          value={formData.bookingId}
          onChange={handleChange}
        />

        <label>Start KM</label>
        <input
          type="number"
          name="startKm"
          value={formData.startKm}
          onChange={handleChange}
        />

        <label>End KM</label>
        <input
          type="number"
          name="endKm"
          value={formData.endKm}
          onChange={handleChange}
        />

        <label>Total KM</label>
        <input
          type="number"
          name="totalKm"
          value={formData.totalKm}
          readOnly
        />

        <label>Trip Type</label>
        <select
          name="tripType"
          value={formData.tripType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Local Pune">Pune Local</option>
          <option value="outstation">
            Outstation
          </option>
          <option value="Local Transfer">Local Transfer</option>

        </select>

        <label>Trip Rate</label>
        <input
          type="number"
          name="tripRate"
          value={formData.tripRate}
          onChange={handleChange}
        />

        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

        <label>Extra KM</label>
        <input
          type="number"
          name="extraKm"
          value={formData.extraKm}
          onChange={handleChange}
        />

        <label>Extra Hours</label>
        <input
          type="number"
          name="extraHours"
          value={formData.extraHours}
          onChange={handleChange}
        />

        <label>Toll</label>
        <input
          type="number"
          name="toll"
          value={formData.toll}
          onChange={handleChange}
        />

        <label>Parking</label>
        <input
          type="number"
          name="parking"
          value={formData.parking}
          onChange={handleChange}
        />

        <label>Received Amount</label>
        <input
          type="number"
          name="lastReceiveAmount"
          value={formData.lastReceiveAmount}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn"
        >
          Generate PDF
        </button>
      </form>

<div
  style={{
    position: "absolute",
    left: "-9999px",
    top: 0,
  }}
>
  <InvoicePreview formData={formData} />
</div>
     
    </div>
  );
}

export default BillForm;