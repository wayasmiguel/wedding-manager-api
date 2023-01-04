'use strict'

const { Schema, model } = require('mongoose');
const model = "CountDown";

const modelSchema = new Schema({
  title: { type: String },
  date:  { type: String }
}, 
{ 
    collection: model,
    timestamps: true
});

modelSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model(model, modelSchema);