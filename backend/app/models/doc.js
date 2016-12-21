var mongoose = require('mongoose');

var StatusDoc = ['Enable', 'Disable'];
var dep = ['liser', 'Leather', 'teeth'];
var Schema = mongoose.Schema;

var Doc = new Schema({
    Email: { type: String, required: 'Please Enter Your email', unique: true },
    Name: { type: String, required: 'Please Enter Your Name', unique: true },
    Password: { type: String, required: 'Please Enter Your Password' },
    Status: { type: String, enum: StatusDoc, default: 'Enable' },
    PicUrl: { type: String, required: 'Please Enter Your Password' },
    Dep: { type: String, enum: dep, required: 'Please Enter  his department' }
});

module.exports = mongoose.model('Doc', Doc);