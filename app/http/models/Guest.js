'use strict'

const { Schema, model } = require('mongoose');
const modelName = "Guest";

const modelSchema = new Schema({
    
}, 
{ 
    collection: modelName,
    timestamps: true
});


modelSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.gid = _id;

    return object;
});

module.exports = model(modelName, modelSchema);