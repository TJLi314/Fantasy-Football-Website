const Player = require("../models/player");
const Team = require("../models/team");
const Position = require("../models/position");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_detail = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});