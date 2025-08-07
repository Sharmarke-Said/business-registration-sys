exports.PASSWORD_RESET_TEMPLATE = (email, otp) => `
<!DOCTYPE html>
<html>
<head>
  <title>Password Reset</title>
  <style>
    body {
      font-family: 'Open Sans', sans-serif;
      background: #f0f4f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background: #fff;
      padding: 40px;
      border-radius: 10px;
    }
    .btn {
      background: #007bff;
      color: #fff;
      padding: 12px;
      text-align: center;
      border-radius: 6px;
      display: inline-block;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Request</h2>
    <p>We received a request to reset your password for: <strong>${email}</strong>.</p>
    <p>Use the OTP below:</p>
    <div class="btn">${otp}</div>
    <p>This OTP is valid for 15 minutes.</p>
  </div>
</body>
</html>
`;
