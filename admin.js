const loanDataRef = database.ref("loanRequests");

function fetchLoanData() {
  loanDataRef.on("value", (snapshot) => {
    const loanData = snapshot.val();
    const tableBody = document.getElementById("loan-data");
    tableBody.innerHTML = ""; // Clear existing data

    for (const key in loanData) {
      const { name, mobile, email, pan, bankDetails, status } = loanData[key];

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${name}</td>
        <td>${mobile}</td>
        <td>${email}</td>
        <td>${pan}</td>
        <td>${bankDetails}</td>
        <td>
          <button onclick="approveLoan('${key}')">Approve</button>
          <button onclick="rejectLoan('${key}')">Reject</button>
        </td>
      `;

      tableBody.appendChild(row);
    }
  });
}

function approveLoan(key) {
  loanDataRef
    .child(key)
    .update({ status: "approved" })
    .then(() => alert("Loan approved successfully!"))
    .catch((error) => console.error("Error approving loan:", error));
}

function rejectLoan(key) {
  loanDataRef
    .child(key)
    .update({ status: "rejected" })
    .then(() => alert("Loan rejected successfully!"))
    .catch((error) => console.error("Error rejecting loan:", error));
}

// Fetch loan data on page load
window.onload = fetchLoanData;