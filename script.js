document.getElementById('rechargeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let mobileNumber = document.getElementById('mobileNumber').value;
    let amount = document.getElementById('amount').value;
    let rechargeType = document.getElementById('rechargeType').value;

    if (!mobileNumber || !amount) {
        alert("Please fill all the fields.");
        return;
    }

    // Validate mobile number format
    let mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // Send data to backend (Node.js)
    fetch('http://localhost:4000/recharge', {  // 3000 से 4000 कर दिया
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mobileNumber: mobileNumber,
            amount: amount,
            rechargeType: rechargeType,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert(`Recharge successful! Data: ${JSON.stringify(data)}`);
    })
    .catch(error => {
        alert("Error: " + error.message);
    });
});
