const Player = require("../models/player");
const Team = require("../models/team");
const Position = require("../models/position");
const Draft = require("../models/draft");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const [numPlayers, numTeams, numPositions, numDrafts] = await Promise.all([
        Player.countDocuments({}).exec(),
        Team.countDocuments({}).exec(),
        Position.countDocuments({}).exec(),
        Draft.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Fantasy Football Draft Central",
        player_count: numPlayers,
        team_count: numTeams,
        position_count: numPositions,
        draft_count: numDrafts,
    });
});

exports.player_list = asyncHandler(async (req, res, next) => {
    const allPlayers = await Player.find({}).sort({name: 1}).populate("team").populate("position").exec();
    res.render("player_list", {title: "Player List", player_list: allPlayers});
});

exports.player_detail = asyncHandler(async (req, res, next) => {
    const player = await Player.findById(req.params.id).populate("team").populate("position").exec();
    res.render("player_detail", {title: player.name, player: player});
});

exports.player_create_get = asyncHandler(async (req, res, next) => {
    const [allTeams, allPositions] = await Promise.all([
        Team.find().exec(), Position.find().exec()
    ]);
    res.render("player_form", {title: "Create Player", teams: allTeams, positions: allPositions});
});

exports.player_create_post = [
    body("name", "Name must not be empty").trim().isLength({min: 1}).escape(),
    body("team", "Team must not be empty").trim().isLength({min: 1}).escape(),
    body("description", "Description must not be empty").trim().isLength({min: 1}).escape(),
    body("position", "Position must not be empty").trim().isLength({min: 1}).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const player = new Player({
            name: req.body.name, team: req.body.team, position: req.body.position, description: req.body.description,
        });

        if (!errors.isEmpty()) {
            const [allTeams, allPositions] = await Promise.all([
                Team.find().exec(), Position.find().exec()
            ]);

            res.render("player_form", {title: "Create Player", teams: allTeams, positions: allPositions, errors: errors.array()});
        } else {
            await player.save();
            res.redirect(player.url);
        }
    }),
];

exports.player_delete_get = asyncHandler(async (req, res, next) => {
    const player = await Player.findById(req.params.id).exec();
    res.render("player_delete", {title: "Delete Player", player: player});
});

exports.player_delete_post = asyncHandler(async (req, res, next) => {
    await Player.findByIdAndRemove(req.body.playerid);
    res.redirect("/home/players");
});

exports.player_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});

exports.player_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented");
});