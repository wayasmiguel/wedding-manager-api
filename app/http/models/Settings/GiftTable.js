'use strict'

const { Schema, model } = require('mongoose');
const modelName = "GiftTable";

const modelSchema = new Schema({
  title:  { type: String },
  tables: [ {
    code:  String,
    url:   String
  } ]
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