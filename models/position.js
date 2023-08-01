const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    name: {type: String, required: true},
    players: [{type: Schema.Types.ObjectId, ref: "Player"}],
});

PositionSchema.virtual("url").get(function() {
    return `/positions/${this._id}`;
});

module.exports = mongoose.model("Position", PositionSchema);