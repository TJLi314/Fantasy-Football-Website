const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    name: {type: String, required: true},
});

PositionSchema.virtual("url").get(function() {
    return `/home/position/${this._id}`;
});

module.exports = mongoose.model("Position", PositionSchema);