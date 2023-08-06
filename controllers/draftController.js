const Player = require("../models/player");
const Draft = require("../models/draft");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.draft_list = asyncHandler(async (req, res, next) => {
    const allDrafts = await Draft.find().sort({title: 1}).exec();
    res.render("draft_list", {title: "Draft List", drafts: allDrafts});
});

exports.draft_detail = asyncHandler(async (req, res, next) => {
    const draft = await Draft.findById(req.params.id).populate("picks").exec();
    res.render("draft_detail", {title: draft.title, draft: draft});
});

exports.draft_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.draft_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.draft_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.draft_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.draft_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.draft_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});