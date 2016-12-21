
var mongoose = require('mongoose');
var dep = ['liser', 'Leather', 'teeth'];
var status = ['Disable', 'Enable']
var Schema = mongoose.Schema;
var Offer = new Schema({

    Name: { type: String, requied: 'please enter your name ' },
    Dep: { type: String, enum: dep },
    PriceBefore: { type: String, required: 'Please select price before offer' },
    PriceAfter: { type: String, required: 'Please select price after offer' },
    CreateDate: { type: Date, default: Date.now },
    ExpireDate: { type: Date },
    status: { type: String, enum: status, default: 'Enable' }

});
module.exports = mongoose.model('Offer', Offer);