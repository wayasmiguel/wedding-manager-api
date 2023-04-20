'use strict'

const { Schema, model } = require('mongoose');
const modelName = "Guest";

const modelSchema = new Schema({
    prefix:         { type: String },
    name:           { type: String },
    lastName:       { type: String },
    phone:          { type: String, unique: true },
    firstFilter:    { type: Number, default: 1 }, // 0 Canceled, 1 Pending, 2 Confirmed
    secondFilter:   { type: Number, default: 1 }, // 0 Canceled, 1 Pending, 2 Confirmed
    group:          { type: String },
    age:            { type: String },
    table:          { type: Number },
    companions:     { 
        adults: {
            type: Number,
            default: 0
        },
        children: {
            type: Number,
            default: 0
        }
    },
    message:        { type: String },
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