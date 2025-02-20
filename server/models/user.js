const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
         type: String,
          required: true
         },


    email: { 
        type: String,
         required: true, 
         unique: true
         },

    password: {
         type: String,
          required: true
         },
    rewardPoints: { 
        type: Number, 
        default: 0 
    },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
