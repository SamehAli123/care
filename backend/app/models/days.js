
var mongoose = require('mongoose');
var dep = ['liser', 'Leather', 'teeth'];
var Schema = mongoose.Schema;
var Day = new Schema({
    day: { type: String, requied: 'please  enter day ' },
    Time: [{
        from: { type: String },
        to: { type: String },
    }],
    dep: { type: String, enum: dep }
});
module.exports = mongoose.model('Day', Day);