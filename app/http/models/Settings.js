'use strict'

const { Schema, model } = require('mongoose');
const modelName = "Settings";

const modelSchema = new Schema({
    user:          { type: Schema.Types.ObjectId, ref: 'User', autopopulate: false },
    countDown:     { type: Schema.Types.ObjectId, ref: 'CountDown', autopopulate: { select: 'title date' } },
    itinerary:     { type: Schema.Types.ObjectId, ref: 'Itinerary', autopopulate: { select: 'title subtitle timeline' } },
    gettingThere:  { type: Schema.Types.ObjectId, ref: 'GettingThere', autopopulate: { select: 'title places' } },
    giftTable:     { type: Schema.Types.ObjectId, ref: 'GiftTable', autopopulate: { select: 'title tables'} },
    hashTag:       { type: Schema.Types.ObjectId, ref: 'HashTag', autopopulate: { select: 'title hashtag textSmall' } },
    confirmation:  { type: Schema.Types.ObjectId, ref: 'Confirmation', autopopulate: { select: 'title textGeneral'  } },
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