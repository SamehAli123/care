/**
 * Created by Dragon on 05/10/2015.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var Dep = new Schema({




    Name: { type: String, requied: 'please enter your name depatement  ' },

    WorkingDays: [{
        From: { type: String },
        to: { type: String }
    }],
    Hours: [{
        From: { type: String },
        to: { type: String }
    }]




});
module.exports = mongoose.model('Dep', Dep);