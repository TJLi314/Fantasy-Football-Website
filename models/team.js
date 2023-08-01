const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {type: String, required: true},
    coaches: [{type: String}],
});

TeamSchema.virtual("url").get(function () {
    return `/teams/${this._id}`;
});

module.exports = mongoose.model("Team", TeamSchema);
