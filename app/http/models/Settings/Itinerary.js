'use strict'

const { Schema, model } = require('mongoose');
const modelName = "Itinerary";

const modelSchema = new Schema({
  title:    { type: String },
  subtitle: { type: String },
  timeline: {
    type: Array,
    default: [ {
      subtitle:     String,
      textGeneral:  String,
      textSmall:    String
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