
var mongoose = require('mongoose');
var dep = ['الجلديه', 'الليزر', 'الاسنان'];

var Schema = mongoose.Schema;
var askDoc = new Schema({
    day: { type: String, requied: 'please  enter day ' },
    Time: [{
        from: { type: String, requied: 'please  enter from start work ' },
        to: { type: String, requied: 'please  enter from   end  work ' },
    }],

    dep: { type: String, enum: dep }
});
module.exports = mongoose.model('askDoc', askDoc);