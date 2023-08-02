const Player = require("../models/player");
const Team = require("../models/team");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.team_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.team_detail = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.team_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.team_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.team_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.team_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.team_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.team_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});