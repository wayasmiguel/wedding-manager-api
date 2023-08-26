'use strict'

const { Schema, model } = require('mongoose');
const modelName = "Guest";

const modelSchema = new Schema({
    name:           { type: String },
    lastName:       { type: String },
    phone:          { type: String, unique: true },
    code:           { type: String, unique: true },
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
    confirmation: {
        firstFilter: {
            date: { type: Date },
            status: { type: Number, default: 1 }, // 0 Canceled, 1 Pending, 2 Confirmed
            companions: {
                adults: {
                    type: Number,
                    default: 0
                },
                children: {
                    type: Number,
                    default: 0
                }
            },
            companionsName: { type: String, default: "" }
        },
        secondFilter: {
            date: { type: Date },
            status: { type: Number, default: 1 }, // 0 Canceled, 1 Pending, 2 Confirmed
            companions: {
                adults: {
                    type: Number,
                    default: 0
                },
                children: {
                    type: Number,
                    default: 0
                }
            },
            companionsName: { type: String, default: "" }
        }
    },
    message:        { type: String },
    attendance:     { type: Boolean, default: false }
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