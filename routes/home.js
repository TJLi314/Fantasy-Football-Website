const express = require("express");
const router = express.Router();

const player_controller = require("../controllers/playerController");
const team_controller = require("../controllers/teamController");
const position_controller = require("../controllers/positionController");
const draft_controller = require("../controllers/draftController");

/// Player Routes ///

router.get("/", player_controller.index);   // Home Page

router.get("/player/create", player_controller.player_create_get);      // create new player 
router.post("/player/create", player_controller.player_create_post);

router.get("/player/:id/delete", player_controller.player_delete_get);  // delete player
router.post("/player/:id/delete", player_controller.player_delete_post);

router.get("/player/:id/update", player_controller.player_update_get);  // update player
router.post("/player/:id/update", player_controller.player_update_post);

router.get("/player/:id", player_controller.player_detail);     // read one player or all players
router.get("/players", player_controller.player_list);

/// Team Routes ///

router.get("/team/create", team_controller.team_create_get);      // create new team
router.post("/team/create", team_controller.team_create_post);

router.get("/team/:id/delete", team_controller.team_delete_get);  // delete team
router.post("/team/:id/delete", player_controller.team_delete_post);

router.get("/team/:id/update", team_controller.team_update_get);  // update team
router.post("/team/:id/update", team_controller.team_update_post);

router.get("/team/:id", team_controller.team_detail);     // read one or all teams
router.get("/teams", team_controller.team_list);

/// Position Routes ///

router.get("/position/create", position_controller.position_create_get);      // create new position
router.post("/position/create", position_controller.position_create_post);

router.get("/position/:id/delete", position_controller.position_delete_get);  // delete position
router.post("/position/:id/delete", position_controller.position_delete_post);

router.get("/position/:id/update", position_controller.position_update_get);  // update position
router.post("/position/:id/update", position_controller.position_update_post);

router.get("/position/:id", position_controller.position_detail);     // read one or all positions
router.get("/positions", position_controller.position_list);

/// Draft Routes ///

router.get("/draft/create", draft_controller.draft_create_get);      // create new draft
router.post("/draft/create", draft_controller.draft_create_post);

router.get("/draft/:id/delete", draft_controller.draft_delete_get);  // delete draft
router.post("/draft/:id/delete", draft_controller.draft_delete_post);

router.get("/draft/:id/update", draft_controller.draft_update_get);  // update draft
router.post("/draft/:id/update", draft_controller.draft_update_post);

router.get("/draft/:id", draft_controller.draft_detail);     // read one or all draft
router.get("/drafts", draft_controller.draft_list);

module.exports = router;