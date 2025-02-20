const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        },
    description: {
        type: String,
        default: ''
    },
    members: [{
         type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
         }],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'user',
      required: true
     },
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

module.exports = mongoose.model('Group', groupSchema);
