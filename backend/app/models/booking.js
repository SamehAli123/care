
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Booking = new Schema({
    day: { type: Schema.Types.ObjectId, ref: 'Day', required: 'Please get day' },
    date: { type: Date, requied: 'please  enter date ' },
    time: { type: String, requied: 'please  enter date ' },
    Creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' }
});
module.exports = mongoose.model('Booking', Booking);