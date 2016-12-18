
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Rating = new Schema({

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    rating: { type: Number, required: 'please enter rate value', min: 1, max: 5 },
    depid: { type: Schema.Types.ObjectId, ref: 'Dep', required: 'Please enter department ' }

});
module.exports = mongoose.model('Rating', Rating);