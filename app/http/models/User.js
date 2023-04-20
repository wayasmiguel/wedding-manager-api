'use strict'

const { Schema, model } = require('mongoose');
const modelName = "User";
const bcrypt = require('bcryptjs');

const modelSchema = new Schema({
    username:           { type: String, unique: true  },
    email:              { type: String, unique: true },
    password:           { type: String },
    active:             { type: Boolean, default: true },
    settings:           { type: Schema.Types.ObjectId, ref: 'User' },
    settings_firebase:  { type: String },
}, 
{ 
    collection: modelName,
    timestamps: true
});

modelSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

modelSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

modelSchema.pre('findOneAndUpdate', async function (next) {
    if(this._update.password){
        this._update.password = await bcrypt.hashSync(this._update.password, 12);
    }
    next();
});

modelSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    
    return object;
});

module.exports = model(modelName, modelSchema);