const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

vendorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;
