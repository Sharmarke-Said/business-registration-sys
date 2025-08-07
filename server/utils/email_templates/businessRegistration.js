exports.BUSINESS_REGISTRATION_TEMPLATE = (
  firstName,
  businessName
) => `
<!DOCTYPE html>
<html>
<head>
  <title>Business Registration Confirmation</title>
  <style>
    body {
      font-family: 'Open Sans', sans-serif;
      background-color: #f0f4f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 10px;
    }
    .highlight {
      color: #007bff;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Hello ${firstName},</h2>
    <p>Thank you for registering your business with us!</p>
    <p>Your business <span class="highlight">${businessName}</span> has been successfully submitted for review.</p>
    <p>You will receive an update once our team verifies your information.</p>
    <p>We appreciate your interest and look forward to working with you.</p>
  </div>
</body>
</html>
`;
