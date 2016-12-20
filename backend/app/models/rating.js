
var mongoose = require('mongoose');
var dep = ['«·Ã·œÌÂ', '«··Ì“—', '«·«”‰«‰'];

var Schema = mongoose.Schema;
var Rating = new Schema({

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    rating: { type: Number, required: 'please enter rate value', min: 1, max: 5 },
    depid: { type: String, enum: dep }

});
module.exports = mongoose.model('Rating', Rating);