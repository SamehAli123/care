var mongoose = require('mongoose');

var StatusDoc = ['Enable', 'Disable'];

var Schema = mongoose.Schema;

var Doc = new Schema({
    Email: { type: String, required: 'Please Enter Your email' },
    Name: { type: String, required: 'Please Enter Your Name' },
    Password: { type: String, required: 'Please Enter Your Password' },
    Status: { type: String, enum: StatusDoc },
    PicUrl: { type: String, required: 'Please Enter Your Password' },
    Dep: { type: Schema.Types.ObjectId, ref: 'Dep', required: 'Please select department' }
});

module.exports = mongoose.model('Doc', Doc);