const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Customer = require('../models/Customer'); 
const webpush = require('web-push');

// Vendor registration route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Save the customer to the database
        const doc = await Vendor.findOne({ email });

        if(!doc) {
            throw new Error('Email does not exists');
        }

        if(doc.password !== password) {
            throw new Error('password incorrect');
        }

        res.cookie('auth', doc.id, { httpOnly: true, secure: true, sameSite: 'None', path: '/' });
        res.status(200).send();  // Send response back to the client
    } catch (error) {
        console.log("Error while siging in vendor:", error);  // Log the error
        res.status(400).json({ error: 'Error while signing in vendor' });  // Handle error and send back
    }
});

const vendors = {};

router.post('/ping', async (req, res) => {
    try {
        const { coords } = req.body;

        const vendor = await Vendor.findById(req.userId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        const vendorLocation = [coords.long, coords.lat]; // [longitude, latitude]

        const customers = await Customer.find({
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: vendorLocation },
                    $maxDistance: 100, // Adjust this to your desired distance in meters
                },
            },
        });

        if (!(vendor.id in vendors)) {
            vendors[vendor.id] = [];
        }

        const newCustomers = customers.filter(customer => {
            if (!vendors[vendor.id].includes(customer._id.toString())) {
                vendors[vendor.id].push(customer._id.toString()); // Track customer as "seen"
                return true; // Keep this customer in the new customers list
            }
            return false; // Filter out if already in oldCustomers
        });

        webpush.setVapidDetails(
            'mailto:kushagra0304@gmail.com',
            'BLPbQTPp2lK5-D76arebSZDFniH3kDNSLhaDVd2Tjm6STz3i3nwU0Avkbm6VPIlRv0_c8TBcXMN2oGOTF1sOE30',
            'me6SLAjZpcPhZq6WQ4Oj3MPo7aSksDuFhEwxkJMoGoE'
        );

        for(let i = 0; i < newCustomers.length; i++) {
            const customer = newCustomers[i];

            const subscription = {
                endpoint: customer.notificationEndpoint,
                keys: {
                    p256dh: customer.notificationKEYp256dh,
                    auth: customer.notificationKEYauth,
                }
            };

            const payload = JSON.stringify({
                title: 'VendorPing',
                body: `${vendor.type} vendor ${vendor.name} is near you`,
            });

            webpush.sendNotification(subscription, payload)
            .then(response => console.log('Notification sent:', response))
            .catch(error => console.error('Error sending notification:', error));
        }

        res.status(200).send();
    } catch (error) {
        console.error('Error fetching nearby customers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Future Work
// exports.updateProducts = async (req, res) => {
//   const { products } = req.body;
//   await Vendor.findOneAndUpdate({ _id: req.vendorId }, { products });
//   res.status(200).json({ message: 'Products updated successfully' });
// };



module.exports = router;
