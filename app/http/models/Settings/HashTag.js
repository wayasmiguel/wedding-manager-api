'use strict'

const { Schema, model } = require('mongoose');
const modelName = "HashTag";

const modelSchema = new Schema({
  title:     { type: String },
  hashtag:   { type: String },
  textSmall: { type: String }
}, 
{ 
    collection: modelName,
    timestamps: true
});

modelSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    
    return object;
});

module.exports = model(modelName, modelSchema);