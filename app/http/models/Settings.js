'use strict'

const { Schema, model } = require('mongoose');
const modelName = "Settings";

const modelSchema = new Schema({
    user:          { type: Schema.Types.ObjectId, ref: 'User',          autopopulate: false },
    countDown:     { type: Schema.Types.ObjectId, ref: 'CountDown',     autopopulate: true },
    itinerary:     { type: Schema.Types.ObjectId, ref: 'Itinerary',     autopopulate: true },
    gettingThere:  { type: Schema.Types.ObjectId, ref: 'GettingThere',  autopopulate: true },
    giftTable:     { type: Schema.Types.ObjectId, ref: 'GiftTable',     autopopulate: true },
    hashTag:       { type: Schema.Types.ObjectId, ref: 'HashTag',       autopopulate: true },
    confirmation:  { type: Schema.Types.ObjectId, ref: 'Confirmation',  autopopulate: true },
}, 
{ 
    collection: modelName,
    timestamps: true
});

modelSchema.plugin(require('mongoose-autopopulate'));

modelSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.sid = _id;
    
    return object;
});

module.exports = model(modelName, modelSchema);