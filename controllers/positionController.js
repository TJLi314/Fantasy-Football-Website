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
    res.render("position_form", {title: "Create Position"});
});

exports.position_create_post = [
    body("name", "Name must not be empty").trim().isLength({min: 1}).escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const position = new Position({
            name: req.body.name,
        });

        if (!errors.isEmpty()) {
            res.render("position_form", {title: "Create Position", errors: errors.array()});
        } else {
            await position.save();
            res.redirect(position.url);
        }
    })
];

exports.position_delete_get = asyncHandler(async (req, res, next) => {
    const [position, players] = await Promise.all([
        Position.findById(req.params.id).exec(), Player.find({position: req.params.id}).exec(),
    ]);
    res.render("position_delete", {title: "Delete Position", position: position, players: players});
});

exports.position_delete_post = asyncHandler(async (req, res, next) => {
    await Position.findByIdAndRemove(req.body.positionid);
    res.redirect('/home/positions');
});

exports.position_update_get = asyncHandler(async (req, res, next) => {
    const position = await Position.findById(req.params.id).exec();
    res.render("position_form", {title: "Update Position", position: position});
});

exports.position_update_post = [
    body("name", "Name must not be empty").trim().isLength({min: 1}).escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const position = new Position({
            name: req.body.name, _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.render("position_form", {title: "Update Position", errors: errors.array(), position: position});
        } else {
            await Position.findByIdAndUpdate(req.params.id, position)
            res.redirect(position.url);
        }
    })
];