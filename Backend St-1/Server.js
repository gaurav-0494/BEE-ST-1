const express = require('express')
const {default: mongoose}= require("mongoose");
const userData = require(`./model/User`);
//const userController = require('./Controller/userController');
const dB = require('./Middlewares/dB');
dB.connectToDb();
const config = require('config');


const app = express();

app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');



// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// xxxx

// CRUD operations for products

let products = [
  { id: 1, name: 'Product A', price: 20.0 },
  { id: 2, name: 'Product B', price: 30.0 },
  // Add more sample data as needed
];

// Route to create a new product
app.post('/products', (req, res) => {
  const data = req.body;

  const newProduct = {
    id: products.length + 1,
    name: data.name,
    price: data.price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// Route to retrieve all products with pagination
app.get('/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 10;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  res.json(products.slice(start, end));
});

// Route to retrieve a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Route to update a product by ID
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    const data = req.body;
    product.name = data.name || product.name;
    product.price = data.price || product.price;

    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' }); 
  }
});

// Route to delete a product by ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1)[0];
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' }); // 404 status code for not found
  }
});

//CRUD operations for reviews
// Sample data (in-memory storage, replace with a database in a real application)
let product = [
  {
    id: 1,
    name: 'Product A',
    price: 20.0,
    reviews: [
      { id: 1, text: 'Great product!', rating: 5 },
      { id: 2, text: 'Could be better', rating: 3 },
    ],
  },
  {
    id: 2,
    name: 'Product B',
    price: 30.0,
    reviews: [
      { id: 3, text: 'Awesome!', rating: 5 },
      { id: 4, text: 'Not impressed', rating: 2 },
    ],
  },
  // Add more sample data as needed
];

// Route to add a new review to a product
app.post('/products/:productId/reviews', (req, res) => {
  const productId = parseInt(req.params.productId);
  const products = product.find((p) => p.id === productId);

  if (product) {
    const data = req.body;
    const newReview = {
      id: product.reviews.length + 1,
      text: data.text,
      rating: data.rating,
    };

    product.reviews.push(newReview);

    res.status(201).json(newReview);
  } else {
    res.status(404).json({ error: 'Product not found' }); // 404 status code for not found
  }
});

// Route to retrieve all reviews for a specific product with pagination
app.get('/products/:productId/reviews', (req, res) => {
  const productId = parseInt(req.params.productId);
  const products = product.find((p) => p.id === productId);

  if (product) {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;

    const start = (page - 1) * perPage;
    const end = start + perPage;

    res.json(product.reviews.slice(start, end));
  } else {
    res.status(404).json({ error: 'Product not found' }); // 404 status code for not found
  }
});

// Route to update a review by ID within a product
app.put('/products/:productId/reviews/:reviewId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const reviewId = parseInt(req.params.reviewId);

  const products = product.find((p) => p.id === productId);
  const review = product && product.reviews.find((r) => r.id === reviewId);

  if (review) {
    const data = req.body;
    review.text = data.text || review.text;
    review.rating = data.rating || review.rating;

    res.json(review);
  } else {
    res.status(404).json({ error: 'Review not found' }); // 404 status code for not found
  }
});

// Route to delete a review by ID within a product
app.delete('/products/:productId/reviews/:reviewId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const reviewId = parseInt(req.params.reviewId);

  const products = product.find((p) => p.id === productId);
  const reviewIndex = product && product.reviews.findIndex((r) => r.id === reviewId);

  if (reviewIndex !== -1) {
    const deletedReview = product.reviews.splice(reviewIndex, 1)[0];
    res.json(deletedReview);
  } else {
    res.status(404).json({ error: 'Review not found' }); // 404 status code for not found
  }
});



app.get('/', (req,res) => {
    res.send(`Hello G22 i am Node.js`);
})


app.post('/register', (req,res) => {         //in app.get or in app.post first arguement is path and second one is controller.
    const inputData = req.body;
    const createData = userData.create(inputData);
    //console.log('inputData',inputData);
    //res.send(inputData);
    res.status(202).json(inputData);
})

//app.post('/create-user', userController.)

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
})



