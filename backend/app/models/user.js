/**
 * Created by Dragon on 05/10/2015.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var User = new Schema({
    //OrganizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: 'Please select organization' },
    //LeadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: 'Please select type' },
    //Type: { type: String,enum:type, required: 'Please select organization'},
    //value: { type: String, required: 'Please enter Value' },

    //CreatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please select user' },
    //CreatedDate: { type: Date, default: Date.now },
    //UpdatedDate: { type: Date, default: Date.now },
    //UpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },



    Name: { type: String, requied: 'please enter your name ' },
    
    Email: { type: String },
    picUrl: { type: String }



    

});
module.exports = mongoose.model('User', User);