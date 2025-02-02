import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { NotificationManager } from "react-notifications";

const generateInvoice = (
  medList,
  systemData,
  customer,
  quantities,
  totals,
  date,
  invoiceData,
  cId,
  salesId
) => {
  const doc = new jsPDF();
  // // Add Company Logo
  const logoUrl = "https://i.imgur.com/GOgB6Zu.png";
  // doc.addImage(logoUrl, "PNG", 5, 10, 50, 30); // (image, type, x, y, width, height)
  axios
    .get(logoUrl, {
      responseType: "blob",
    })
    .then((res) => {
      const blob = res.data;
      const reader = new FileReader();
      reader.onloadend = () => {
        const logoBase64 = reader.result;
        doc.addImage(logoBase64, "PNG", 5, 10, 50, 30);
        // Add Company Name
        doc.setFontSize(15);
        doc.text(systemData.companyName, 50, 20); // (text, x, y)
        // Optional: Add Address or Tagline
        doc.setFontSize(12);
        doc.text(
          systemData.address.substring(0, systemData.address.length / 2 + 2),
          50,
          30
        );
        doc.text(
          systemData.address.substring(
            systemData.address.length / 2 + 2,
            systemData.address.length
          ),
          50,
          35
        );
        doc.text(
          `Phone: ${systemData.phoneNumber} | Email: ${systemData.email} `,
          50,
          40
        );

        // Add Title
        doc.setFontSize(16);
        doc.text("Invoice", 105, 50, null, null, "center");

        // Add Metadata
        doc.setFontSize(12);
        doc.text(`Invoice No: ${salesId}`, 10, 60);
        doc.text(`Date: ${date}`, 10, 70);
        doc.text(`Customer: ${customer.name}`, 10, 80);
        doc.text(`Customer Phone: ${customer.phone}`, 10, 90);
        doc.text(`Customer Email: ${customer.email}`, 10, 100);

        // Table for Medicine Details
        const tableColumn = ["Medicine Name", "Quantity", "Price", "Total"];
        const tableRows = medList.map((item, index) => [
          item.medName,
          quantities[index],
          `Rs.${item.price.toFixed(2)}`,
          `Rs.${totals[index].toFixed(2)}`,
        ]);

        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 110,
        });

        doc.text(
          `Sub Total : Rs.${invoiceData.subTotal}`,
          10,
          doc.lastAutoTable.finalY + 10
        );
        doc.text(
          `Tax Amount: Rs.${invoiceData.taxAmount.toFixed(2)}`,
          10,
          doc.lastAutoTable.finalY + 20
        );
        doc.text(
          `Discount Amount: Rs.${invoiceData.discountAmount.toFixed(2)}`,
          10,
          doc.lastAutoTable.finalY + 30
        );
        doc.text(
          `Total: Rs.${invoiceData.total.toFixed(2)}`,
          10,
          doc.lastAutoTable.finalY + 40
        );
        const pdfBlob = doc.output("blob");
        sendEmail(pdfBlob, customer.email);
        setTimeout(() => {
          uploadInvoice(salesId, cId, pdfBlob);
          setTimeout(() => {
            handleInventoryUpdate(quantities, medList);
          }, 1000);
        }, 1000);
      };
      reader.readAsDataURL(blob);
    })
    .catch((err) => {
      NotificationManager.error("Unable to read pdf:", err);
    });
};

const uploadInvoice = async (salesId, customerId, pdfBlob) => {
  const url = "http://localhost:8080/api/invoice";
  const newFormData = new FormData();
  newFormData.append("file", pdfBlob);
  newFormData.append("customerId", customerId);
  newFormData.append("salesId", salesId);
  await axios
    .post(`${url}/upload`, newFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        NotificationManager.success("Invoice Added Successfully");
      }
    })
    .catch((err) => {
      console.log(err);
      NotificationManager.error("Failed to Add Invoice");
    });
};
const sendEmail = async (pdfBlob, customerEmail) => {
  const url = "http://localhost:8080/api/invoice";
  const formData = new FormData();
  formData.append("file", pdfBlob, "invoice.pdf"); // Append PDF blob as file
  formData.append("email", customerEmail); // Attach the customer's email

  await axios
    .post(`${url}/sendEmail`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type for form data
      },
    })
    .then((res) => {
      if (res.status === 200) {
        NotificationManager.success("Invoice sent successfully");
      }
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      NotificationManager.error("Failed to send the invoice");
    });
};

const handleInventoryUpdate = async (quantities, medList) => {
  const medCodes = [];
  medList.map((val) => {
    medCodes.push(val.medCode);
  });
  const med = {
    medCodes: medCodes,
    quantities: quantities,
  };
  await axios
    .put("http://localhost:8080/api/medicine/updateInventory/subs", med)
    .then((res) => {
      NotificationManager.success(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default generateInvoice;
