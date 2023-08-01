const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DraftSchema = new Schema({
    teams: {type: int, required: true},
    order: {type: int, required: true},
    picks: [{type: Schema.Types.ObjectId, ref: "Player"}],
});

DraftSchema.virtual("url").get(function() {
    return `/drafts/${this._id}`;
});

module.exports = mongoose.model("Draft", DraftSchema);