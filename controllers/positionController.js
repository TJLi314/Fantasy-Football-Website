const Player = require("../models/player");
const Position = require("../models/position");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.position_list = asyncHandler(async (req, res, next) => {
    const allPositions = await Position.find({}).sort({name: 1}).exec();
    res.render("position_list", {title: "Position List", position_list: allPositions});
});

exports.position_detail = asyncHandler(async (req, res, next) => {
    const [position, playersInPosition] = await Promise.all([
        Position.findById(req.params.id).exec(), Player.find({position: req.params.id}).exec(),
    ]);
    res.render("position_detail", {title: position.name, position: position, players: playersInPosition});
});

exports.position_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.position_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.position_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.position_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.position_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.position_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});