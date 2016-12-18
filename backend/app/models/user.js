var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var social = ['facebook', 'twitter', 'google+'];



var User = new Schema({
    Name: { type: String, requied: 'please enter your name ' },
    SocialId: { type: String, requied: 'please enter your social id  ' },
    Email: { type: String },
    picUrl: { type: String },
    loginway: { type: String, enum: social }
});
module.exports = mongoose.model('User', User);