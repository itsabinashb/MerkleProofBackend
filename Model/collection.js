const mongoose = require('mongoose');
const { Schema } = mongoose;

const whitelistAddressSchema = new Schema({
  address: String,
});

// Creating the collection of address
exports.whitelistedAddresses = mongoose.model('whitelistedAddresses', whitelistAddressSchema);
