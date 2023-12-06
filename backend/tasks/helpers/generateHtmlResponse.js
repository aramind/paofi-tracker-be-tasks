const generateHtmlResponse = () => {
  return `
    <html>
    <head>
      <style>
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        h2 {
          font-size: 3em; 
        }
      </style>
    </head>
    <body>
      <h2>PAOFI TRACKER APP - TASKS API</h2>
    </body>
    </html>
  `;
};

module.exports = generateHtmlResponse;
