const express = require('express');
const Customer = require('../models/Customer');
const { default: mongoose } = require('mongoose');
const router = express.Router();

// Customer registration route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const customer = new Customer({
        name,
        email,
        password,
    });

    try {
        const savedDoc = await customer.save();
        res.cookie('auth', savedDoc.id, { httpOnly: true, secure: true, sameSite: 'None', path: '/' });
        res.status(200).json(customer);  // Send response back to the client
    } catch (error) {
        console.log("Error while siging up customer:", error);  // Log the error
        res.status(400).json({ error: 'Error while signing up customer' });  // Handle error and send back
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Save the customer to the database
        const doc = await Customer.findOne({ email });

        if(!doc) {
            throw new Error('Email does not exists');
        }

        if(doc.password !== password) {
            throw new Error('password incorrect');
        }

        res.cookie('auth', doc.id, { httpOnly: true, secure: true, sameSite: 'None', path: '/' });
        res.status(200).send();  // Send response back to the client
    } catch (error) {
        console.log("Error while siging in customer:", error);  // Log the error
        res.status(400).json({ error: 'Error while signing in customer' });  // Handle error and send back
    }
});

router.post('/location', async (req, res) => {
    try {
        const doc = await Customer.findById(req.userId);

        if(!doc) {
            throw new Error('user id not valid');
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.userId,
            {
                location: {
                    type: 'Point',
                    coordinates: [req.body.longitude, req.body.latitude], // [longitude, latitude] format
                }
            },
            { new: true } // Return the updated document
        );

        res.status(200).send();  // Send response back to the client
    } catch (error) {
        console.log("Error while saving location", error);  // Log the error
        res.status(400).json({ error: 'Error while saving location' });  // Handle error and send back
    }
});

router.post('/push', async (req, res) => {
    try {
        const doc = await Customer.findById(req.userId);

        if(!doc) {
            throw new Error('user id not valid');
        }

        doc.notificationEndpoint = req.body.endpoint;
        doc.notificationKEYp256dh = req.body.keys.p256dh;
        doc.notificationKEYauth = req.body.keys.auth;

        doc.save();

        res.status(200).send();  // Send response back to the client
    } catch (error) {
        console.log("Error while subscribing to push details:", error);  // Log the error
        res.status(400).json({ error: 'Error while subscribing to push details' });  // Handle error and send back
    }
});

router.post('/notification', async (req, res) => {
    try {
        const doc = await Customer.findById(req.userId);

        doc.notificationEnabled = !doc.notificationEnabled;

        doc.save();

        res.status(200).send();  // Send response back to the client
    } catch (error) {
        console.log("Error while subscribing to push details:", error);  // Log the error
        res.status(400).json({ error: 'Error while subscribing to push details' });  // Handle error and send back
    }
});

router.get('/notification', async (req, res) => {
    try {
        const doc = await Customer.findById(req.userId);

        res.status(200).send(doc.notificationEnabled);  // Send response back to the client
    } catch (error) {
        console.log("Error while subscribing to push details:", error);  // Log the error
        res.status(400).json({ error: 'Error while subscribing to push details' });  // Handle error and send back
    }
});

module.exports = router;