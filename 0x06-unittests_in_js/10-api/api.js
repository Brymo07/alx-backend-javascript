const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 7865;

// Middleware to validate :id as a number
app.param('id', (req, res, next, id) => {
  if (!isNaN(id)) {
    // If :id is a number, continue processing
    next();
  } else {
    // If :id is not a number, return an error response
    res.status(400).send('Invalid parameter :id. It must be a number.');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// Define a route for GET /cart/:id
app.get('/cart/:id', (req, res) => {
  // Access the validated :id from the request parameters
  const { id } = req.params;

  // Return the payment methods for the cart with the specified :id
  res.send(`Payment methods for cart ${id}`);
});

// Define a route for GET /available_payments
app.get('/available_payments', (req, res) => {
  // Return an object with payment methods
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});

// Define a route for POST /login
app.post('/login', (req, res) => {
  const { userName } = req.body;
  res.send(`Welcome ${userName}`);
});

app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});

