import React from "react";
import "./InvoicePreview.css";
import qrImage from "../src/assets/surajScannerKotakbank.jpeg";
import signImage from "../src/assets/surajSign1.png";


function InvoicePreview({ formData }) {
  const puneLocal = Number(formData.tripRate || 0);
  const extraKm = Number(formData.extraKm || 0);
  const extraKmCharges = extraKm * 13;
  const extraHours = Number(formData.extraHours || 0);
  const extraHoursCharges = extraHours * 125;
  const toll = Number(formData.toll || 0);
  const parking = Number(formData.parking || 0);

  const subTotal =
    puneLocal + extraKmCharges + extraHoursCharges + toll + parking;

  const receivedAmount = Number(formData.lastReceiveAmount || 0);

  const balance = subTotal - receivedAmount;
  function numberToWords(num) {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num < 20) return a[num];

    if (num < 100) return b[Math.floor(num / 10)] + " " + a[num % 10];

    if (num < 1000)
      return a[Math.floor(num / 100)] + " Hundred " + numberToWords(num % 100);

    if (num < 100000)
      return (
        numberToWords(Math.floor(num / 1000)) +
        " Thousand " +
        numberToWords(num % 1000)
      );

    return num;
  }
  const amountInWords = numberToWords(subTotal) + " Rupees Only";
  
 function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
}



  return (
    <div id="invoice" className="invoice">
      {/* Header */}
      <div className="header">
        <h1>AS TOURS AND TRAVELS</h1>

        <p>Flat No.303 Panchavati Phase-3 Ambegaon BK Pune</p>

        <p>Phone No : 7620111040</p>

        <p>State - 27 Maharashtra</p>
      </div>

      {/* Top Section */}
      <div className="top-section">
        {/* BILL Details */}
        <div className="box">
          <h3>Bill To</h3>

          <p>
            <strong>GIRIKAND TRAVELS PVT. LTD.</strong>
          </p>

          <p>
            Girikand House, 759/90 B, Bhandarkar Institute Road, Deccan
            Gymkhana, Pune 411004, MH, India
          </p>
        </div>

        {/* Transportation Details */}
        <div className="box">
          <h3>Transportation Details</h3>

          <p>
            <strong>Trip Type :</strong> {formData.tripType}
          </p>

          <p>
            <strong>Car Type :</strong> Aura
          </p>

          <p>
            <strong>Vehicle No :</strong> MH12YB5271
          </p>

          <div className="km-box">
           

            <p>
              <strong>Start KM :</strong> {formData.startKm}
            </p>

            <p>
              <strong>End KM :</strong> {formData.endKm}
            </p>
             <p>
              <strong>Total KM :</strong> {formData.totalKm}
            </p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="box">
          <h3>Invoice Details</h3>

          <p>
            <strong>Invoice No :</strong> {formData.invoiceNumber}
          </p>

          <p>
            <strong>Bill Date :</strong> {formatDate(formData.billDate)}
          </p>

          {/* <p>
            <strong>Start Date :</strong> {formData.startDate}
          </p>

          <p>
            <strong>End Date :</strong> {formData.endDate}
          </p> */}
        </div>
      </div>
      {/* Charges Table */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Particular</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Trip Data</th>
            <th>Trip Rate (Final)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              {formData.tripType === "Local Pune"
                ? "Pune Local"
                : formData.tripType === "outstation"
                  ? "Outstation"
                  : formData.tripType === "Local Transfer"
                    ? "Local Transfer"
                    : "-"}
            </td>
            <td>{formatDate(formData.startDate)}</td>
            <td>{formatDate(formData.endDate)}</td>
            <td>{puneLocal}</td>
            <td>{puneLocal}</td>
          </tr>

          <tr>
            <td>Extra KM</td>
            <td>-</td>
            <td>-</td>
            <td>{extraKm} KM</td>
            <td>{extraKmCharges}</td>
          </tr>

          <tr>
            <td>Extra Hours</td>
            <td>-</td>
            <td>-</td>
            <td>{extraHours}Hrs</td>
            <td>{extraHoursCharges}</td>
          </tr>

          <tr>
            <td>Toll Fee</td>
            <td>-</td>
            <td>-</td>
            <td>{toll}</td>
            <td>{toll}</td>
          </tr>

          <tr>
            <td>Parking Fee</td>
            <td>-</td>
            <td>-</td>
            <td>{parking}</td>
            <td>{parking}</td>
          </tr>

          <tr>
            <td colSpan="3">
              <strong>Sub Total</strong>
            </td>

            <td>
              <strong>₹ {subTotal}</strong>
            </td>

            <td>
              <strong>₹ {subTotal}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      {/* amount in words  */}
      <div className="amount-words">
        <strong>Invoice Amount In Words :</strong>

        <p>{amountInWords}</p>
      </div>
      {/* discription  */}
      <div className="description-section">
        <h3>Description</h3>
        <p>
          <strong>Booking ID :</strong>
          {formData.bookingId}
        </p>

        <p>
          <strong>Customer Name :</strong> {formData.customerName}
        </p>

        <p>
          <strong>Contact No :</strong> {formData.customerMobile}
        </p>
      </div>

      <div className="pay-wrapper">
        {/* LEFT SIDE - Bank Details */}
        <div className="payto-section">
          <h3>Pay To</h3>

          <p>
            <strong>Bank Name :</strong> Kotak Mahindra Bank
          </p>
          <p>
            <strong>Branch :</strong> Anand Nagar, Sinhgad Road, Pune
          </p>
          <p>
            <strong>Bank Account No :</strong> 5148511142
          </p>
          <p>
            <strong>IFSC Code :</strong> KKBK0001764
          </p>
          <p>
            <strong>Account Holder's Name :</strong> Suraj Sunil Udawant
          </p>
        </div>

        {/* RIGHT SIDE - QR */}
        <div className="qr-section">
          <h3>Scan & Pay</h3>

          <img src={qrImage} alt="Payment QR" />
        </div>
      </div>
      {/* terms & condtion  section */}
      <div className="terms-pay-wrapper">
        {/* LEFT SIDE - Terms */}
        <div className="terms-section">
          <h3>Terms & Conditions</h3>

          <ul>
            <li>
              Minimum 300 KM per day average will be applicable for outstation
              trips.
            </li>
            <li>
              Toll charges, parking charges and state entry taxes will be borne
              by the customer.
            </li>
            <li>Overloading is not allowed in any vehicle.</li>
            <li>Driver allowance may vary from trip to trip.</li>
            <li>
              Number of trip days will be calculated according to calendar
              dates.
            </li>
            <li>
              After 12:00 AM, the trip will be considered as the next day and
              300 KM charges will be applicable.
            </li>
            <li>
              Time and kilometer charges will be calculated from garage to
              garage.
            </li>
          </ul>
        </div>
      </div>

      {/* Summary */}
    <div className="bottom-section">

  {/* LEFT - SIGNATURE */}
  <div className="signature-box">
    <span>For: AS TOURS AND TRAVELS</span>

    <img
      src="/src/assets/surajSign1.png"
      alt="Signature"
      className="sign-img"
    />

    <p>Authorized Signature</p>
  </div>

  {/* RIGHT - SUMMARY */}
  <div className="summary-box">

    <div className="row">
      <span>Sub Total :</span>
      <span>₹ {subTotal}</span>
    </div>

    <div className="row">
      <span>Received Amount :</span>
      <span>₹ {receivedAmount ? receivedAmount : 0 }</span>
    </div>

    <div className="row total">
      <span>Balance :</span>
      <span>₹ {balance}</span>
    </div>

  </div>

</div>
      {/* Footer */}

    <p id="thanks">
  <span className="stars">⭐⭐⭐</span>
  <strong> Thank you for choosing AS Tours And Travels </strong>
  <span className="stars">⭐⭐⭐</span>
</p>
    </div>
  );
}

export default InvoicePreview;
