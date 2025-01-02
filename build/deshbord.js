   const db = firebase.database()

// Function to fetch all applications
function fetchAllApplications() {
  const loanRef = db.ref('loanApplications');
  const creditCardRef = db.ref('creditCardApplications');
  const rechargeRef = db.ref('recharges');

  loanRef.once('value', (snapshot) => {
    const loanApplications = snapshot.val();
    displayLoanApplications(loanApplications);
  });

  creditCardRef.once('value', (snapshot) => {
    const creditCardApplications = snapshot.val();
    displayCreditCardApplications(creditCardApplications);
  });

  rechargeRef.once('value', (snapshot) => {
    const rechargeRequests = snapshot.val();
    displayRechargeRequests(rechargeRequests);
  });
}

// Function to display loan applications
function displayLoanApplications(loanApplications) {
  const container = document.getElementById('loanApplications');
  container.innerHTML = '<h2>Loan Applications</h2>';
  for (let key in loanApplications) {
    const loan = loanApplications[key];
    const loanDiv = document.createElement('div');
    loanDiv.innerHTML = `
      <h3>Loan Applicant: ${loan.name}</h3>
      <p>Email: ${loan.email}</p>
      <p>Status: ${loan.status}</p>
      <button onclick="approveLoan('${key}')">Approve</button>
    `;
    container.appendChild(loanDiv);
  }
}

// Function to display credit card applications
function displayCreditCardApplications(creditCardApplications) {
  const container = document.getElementById('creditCardApplications');
  container.innerHTML = '<h2>Credit Card Applications</h2>';
  for (let key in creditCardApplications) {
    const card = creditCardApplications[key];
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
      <h3>Card Applicant: ${card.fullName}</h3>
      <p>Email: ${card.email}</p>
      <p>Status: ${card.status}</p>
    `;
    container.appendChild(cardDiv);
  }
}

// Function to display recharge requests
function displayRechargeRequests(rechargeRequests) {
  const container = document.getElementById('rechargeRequests');
  container.innerHTML = '<h2>Recharge Requests</h2>';
  for (let key in rechargeRequests) {
    const request = rechargeRequests[key];
    const requestDiv = document.createElement('div');
    requestDiv.innerHTML = `
      <h3>Mobile: ${request.mobileNumber}</h3>
      <p>Amount: ${request.amount}</p>
      <p>Status: ${request.status}</p>
    `;
    container.appendChild(requestDiv);
  }
}

// Function to approve loan
function approveLoan(loanKey) {
  const loanRef = db.ref('loanApplications/' + loanKey);
  loanRef.update({ status: 'Approved' })
    .then(() => {
      alert('Loan approved');
      fetchAllApplications();
    })
    .catch((error) => {
      alert('Error approving loan: ' + error.message);
    });
}