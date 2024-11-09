const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const middlewares = require('./utils/middlewares');
const cookieParser = require('cookie-parser');

// Import routes
const vendorRoutes = require('./controllers/vendor');
const customerRoutes = require('./controllers/customer');
const oauthRoutes = require('./controllers/oauth');

const app = express();

app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());

// Check MongoDB URI and connect
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection error:', err);
    process.exit(1);
});

// Routes
app.use(middlewares.authenticateUser);
app.use('/api/oauth', oauthRoutes);
app.use('/api/vendors', vendorRoutes); // All vendor-related routes
app.use('/api/customer', customerRoutes); // All customer-related routes
app.use(middlewares.errorHandler);
app.use(middlewares.unknownEndpoint);

// Serve static assets (React build)
// app.use(express.static(path.join(__dirname, '../client/build')));

// Route for the home page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html')); // For React build
// });

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// 

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const Vendor = require('./models/Vendor');
// const cors = require('cors');
// const webpush = require('web-push');


// const app = express();

// app.use(cors()); // To allow requests from React (localhost:3000)
// app.use(express.json());

// const admin = require('firebase-admin'); // Add this line at the top of your app.js

// const vendorController = require('./controllers/vendorController');
// const customerController = require('./controllers/customerController');
// const fcmConfig = require('./config/fcmConfig.json'); // Adjust the path as necessary
// const { request } = require('http');
// const mongoURI = process.env.MONGO_URI;

// if (! admin.apps.length){
//     admin.initializeApp({
//     credential: admin.credential.cert(fcmConfig),
// });
// }

// // Middleware


// if (!mongoURI) {
//   console.error('MongoDB connection string is undefined. Check your .env file.');
//   process.exit(1);
// }

// // Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => {
//   console.log('MongoDB connection error:', err);
//   process.exit(1);
// });

// // Vendor routes
// app.post('/api/vendors/register', async (req, res) => {
//   console.log(req.body)

//   const { name, age, phoneNo, products, location } = req.body;

//   // Create a new vendor
//   const vendor = new Vendor({ name, age, phoneNo, products, location });

//   try {
//       await vendor.save(); // Save to database
//       res.status(201).send(vendor); // Send response back to the client
//   } catch (error) {
//     console.log(error);
//       res.status(400).send(error); // Handle error and send back
//   }
// });

// app.post('/api/vendor/track-location', vendorController.trackLocation);
// app.put('/api/vendor/update-products', vendorController.updateProducts);

// // Customer routes
// app.post('/api/customer/register', customerController.registerCustomer);
// app.post('/api/customer/request-notification', customerController.requestNotification);

// // Start Scheduled Location Check Job
// // locationJob.start();


// app.use(express.static(path.join(__dirname, '../client/build')));

// // Route for the home page
// app.post('/', async (req, res) => {
//   // res.sendFile(path.join(__dirname, '../client/build', 'index.html')); // For React build
//   webpush.setVapidDetails(
//     'mailto:kushagra0304@gmail.com',
//     'BLPbQTPp2lK5-D76arebSZDFniH3kDNSLhaDVd2Tjm6STz3i3nwU0Avkbm6VPIlRv0_c8TBcXMN2oGOTF1sOE30',
//     'me6SLAjZpcPhZq6WQ4Oj3MPo7aSksDuFhEwxkJMoGoE'
//   );

//   const subscription = {
//     endpoint: req.body.endpoint,
//     keys: {
//       p256dh: req.body.keys.p256dh,
//       auth: req.body.keys.auth
//     }
//   };

//   const payload = JSON.stringify({
//     title: 'Hello!',
//     body: 'This is a notification from your backend!',
//   });

//     webpush.sendNotification(subscription, payload)
//     .then(response => console.log('Notification sent:', response))
//     .catch(error => console.error('Error sending notification:', error));
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // // Example route

// // const webpush = require('web-push');

// // const vapidKeys = webpush.generateVAPIDKeys();

// // console.log(vapidKeys)