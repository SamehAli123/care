
var mongoose = require('mongoose');
var dep = ['الجلديه', 'الليزر', 'الاسنان'];

var Schema = mongoose.Schema;
var Offer = new Schema({

    Name: { type: String, requied: 'please enter your name ' },
    Dep: { type:ٍSting,enum:dep },
    PriceBefore: { type: String, required: 'Please select price before offer' },
    PriceAfter: { type: String, required: 'Please select price after offer' },
    CreateDate: { type: Date, default: Date.now },
    ExpireDate: { type: Date },

});
module.exports = mongoose.model('Offer', Offer);