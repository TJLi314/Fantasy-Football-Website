const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    position: { type: Schema.Types.ObjectId, ref: "Position", required: true},
    description: {type: String, required: true},
});

PlayerSchema.virtual("url").get(function () {
    return `/players/${this._id}`;
});

module.exports = mongoose.model("Player", PlayerSchema);

