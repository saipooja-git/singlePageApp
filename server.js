const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submissions
app.post('/submit', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const submission = { firstName, lastName, email };

  // Append submission to file
  fs.readFile('submissions.json', (err, data) => {
    let submissions = [];
    if (!err) {
      submissions = JSON.parse(data);
    }
    submissions.push(submission);
    fs.writeFile('submissions.json', JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.redirect('/loggedIn.html');
    });
  });
});

// Endpoint to view submissions
app.get('/submissions', (req, res) => {
  fs.readFile('submissions.json', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.post('/submit', (req, res) => {
//     const { name, email, password } = req.body;
//     const data = `Name: ${name}, Email: ${email}, Password: ${password}\n`;
//     fs.appendFile('data.txt', data, (err) => {
//         if (err) throw err;
//         console.log('Data saved!');
//     });
//     res.redirect('loggedIn.html');
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
// ------------------------------------
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Middleware to parse the body of POST requests
// app.use(bodyParser.urlencoded({ extended: true }));

// // In-memory storage for submitted data
// const submissions = [];

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Handle form submissions
// app.post('/submit', (req, res) => {
//   const { firstName, lastName } = req.body;
//   submissions.push({ firstName, lastName });
//   res.redirect('/loggedIn.html');
// });

// // Endpoint to view submissions
// app.get('/submissions', (req, res) => {
//   res.json(submissions);
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
