'use strict'

const { Schema, model } = require('mongoose');
const modelName = "GettingThere";

const modelSchema = new Schema({
  title: { type: String },
  places: {
    type: Array,
    default: [ {
      sufix:    String,
      name:     String,
      address:  String,
      map:      String
    } ]
  }
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