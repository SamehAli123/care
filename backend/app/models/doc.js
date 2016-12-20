var mongoose = require('mongoose');

var StatusDoc = ['Enable', 'Disable'];
var dep = ['«·Ã·œÌÂ', '«··Ì“—', '«·«”‰«‰'];
var Schema = mongoose.Schema;

var Doc = new Schema({
    Email: { type: String, required: 'Please Enter Your email' },
    Name: { type: String, required: 'Please Enter Your Name' },
    Password: { type: String, required: 'Please Enter Your Password' },
    Status: { type: String, enum: StatusDoc },
    PicUrl: { type: String, required: 'Please Enter Your Password' },
    Dep: { type: String,enum:dep }
});

module.exports = mongoose.model('Doc', Doc);