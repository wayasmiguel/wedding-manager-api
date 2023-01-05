'use strict'

const { Schema, model } = require('mongoose');
const modelName = "Confirmation";

const modelSchema = new Schema({
  title:        { type: String },
  textGeneral:  { type: String }
}, 
{ 
    collection: modelName,
    timestamps: true
});

modelSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    
    return object;
});

module.exports = model(modelName, modelSchema);