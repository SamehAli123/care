/**
 * Created by Dragon on 05/10/2015.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var User = new Schema({




    Name: { type: String, requied: 'please enter your name ' },
    
    Email: { type: String },
    picUrl: { type: String }



    

});
module.exports = mongoose.model('User', User);