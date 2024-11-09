const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notificationEnabled: { type: Boolean, required: true, default: true },
  notificationEndpoint: { type: String },
  notificationKEYp256dh : { type: String },
  notificationKEYauth : { type: String },
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: { type: [Number] } // [longitude, latitude]
  },
});

customerSchema.index({ location: '2dsphere' }); // For geolocation queries

customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
