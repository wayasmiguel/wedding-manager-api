'use strict'

const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const modelSchema = new Schema({
    name: { type: String },
    lastName: { type: String },
    secondLastName: { type: String },
    email: { type: String },
    password: { type: String },
    active: { type: Boolean, default: true }
}, 
{ 
    collection: 'User',
    timestamps: true
});

modelSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
}

modelSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

modelSchema.pre('findOneAndUpdate', async function (next) {
    if(this._update.password){
        this._update.password = await bcrypt.hash(this._update.password, 12);
    }
    next();
});

modelSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', modelSchema);
