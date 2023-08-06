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
    const players = await Player.find().exec();
    res.render("draft_form", {title: "Create Draft", players: players});
});

exports.draft_create_post = [
    body("title", "Title must not be empty").trim().isLength({min: 1}).escape(),
    body("teams", "Teams must not be empty").trim().isLength({min: 1}).escape(),
    body("order", "Pick number must not be empty").trim().isLength({min: 1}).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        var players = [];
        players.push(req.body.pick1);
        players.push(req.body.pick2);
        players.push(req.body.pick3);
        players.push(req.body.pick4);
        players.push(req.body.pick5);
        players.push(req.body.pick6);
        players.push(req.body.pick7);
        players.push(req.body.pick8);
        players.push(req.body.pick9);
        players.push(req.body.pick10);
        players.push(req.body.pick11);
        players.push(req.body.pick12);
        players.push(req.body.pick13);
        players.push(req.body.pick14);
        players.push(req.body.pick15);
        players.push(req.body.pick16);


        const draft = new Draft({
            title: req.body.title, teams: req.body.teams, order: req.body.order, picks: players,
        });
        await draft.save();
        res.redirect(draft.url);
    }),
];

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