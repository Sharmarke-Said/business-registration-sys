exports.BUSINESS_STATUS_TEMPLATE = (firstName, status) => `
<!DOCTYPE html>
<html>
<head>
  <title>Business Status</title>
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
  </style>
</head>
<body>
  <div class="container">
    <h2>Hello ${firstName},</h2>
    <p>Your business has been <strong>${status}</strong>.</p>
  </div>
</body>
</html>
`;
