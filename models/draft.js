const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DraftSchema = new Schema({
    title: {type: String, required: true},
    teams: {type: Number, required: true},
    order: {type: Number, required: true},
    picks: [{type: Schema.Types.ObjectId, ref: "Player"}],
});

DraftSchema.virtual("url").get(function() {
    return `/drafts/${this._id}`;
});

module.exports = mongoose.model("Draft", DraftSchema);