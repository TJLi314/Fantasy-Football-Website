const Player = require("../models/player");
const Team = require("../models/team");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.team_list = asyncHandler(async (req, res, next) => {
    const allTeams = await Team.find({}).sort({name: 1}).exec();
    res.render("team_list", { title: "Team List", team_list: allTeams});
});

exports.team_detail = asyncHandler(async (req, res, next) => {
    const [team, players] = await Promise.all([
        Team.findById(req.params.id).exec(), Player.find({team: req.params.id}).exec(),
    ]);
    res.render("team_detail", {title: team.name, team: team, players: players});
});

exports.team_create_get = asyncHandler(async (req, res, next) => {
    res.render("team_form", {title: "Create Team"});
});

exports.team_create_post = [
    body("name", "Name must not be empty").trim().isLength({min: 1}).escape(),
    body("coaches", "coaches must not be empty").trim().isLength({min: 1}).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        coaches = req.body.coaches.split(', ');
        const team = new Team({
            name: req.body.name, coaches: coaches,
        });

        if (!errors.isEmpty()) {
            res.render("team_form", {title: "Create Team", errors: errors.array()});
        } else {
            await team.save();
            res.redirect(team.url);
        }
    }),
];

exports.team_delete_get = asyncHandler(async (req, res, next) => {
    const [team, players] = await Promise.all([
        Team.findById(req.params.id).exec(), Player.find({team: req.params.id}).exec(),
    ]);
    res.render("team_delete", {title: "Delete team", team: team, players: players});
});

exports.team_delete_post = asyncHandler(async (req, res, next) => {
    await Team.findByIdAndRemove(req.body.teamid);
    res.redirect("/home/teams");
});

exports.team_update_get = asyncHandler(async (req, res, next) => {
    const team = await Team.findById(req.params.id).exec();
    res.render("team_form", {title: "Update Team", team: team});
});

exports.team_update_post = [
    body("name", "Name must not be empty").trim().isLength({min: 1}).escape(),
    body("coaches", "coaches must not be empty").trim().isLength({min: 1}).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        coaches = req.body.coaches.split(', ');
        const team = new Team({
            name: req.body.name, coaches: coaches, _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.render("team_form", {title: "Update Team", errors: errors.array(), team: team});
        } else {
            await Team.findByIdAndUpdate(req.params.id, team);
            res.redirect(team.url);
        }
    }),
];