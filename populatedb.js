const userArgs = process.argv.slice(2);

const Player = require("./models/player");
const Team = require("./models/team");
const Position = require("./models/position");
const Draft = require("./models/draft");

const players = []; const teams = []; const positions = []; const drafts = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createTeams(); await createPositions(); await createPlayers(); await createDrafts();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function teamCreate(index, name, coaches) {
    const team = new Team({name: name, coaches: coaches});
    await team.save();
    teams[index] = team;
    console.log(`Added team: ${name}`);
}

async function positionCreate(index, name) {
    const position = new Position({name: name});
    await position.save();
    positions[index] = position;
    console.log(`Added position: ${name}`);
}

async function playerCreate(index, name, team, position, description) {
    const player = new Player({name: name, team: team, position: position, description: description});
    await player.save();
    players[index] = player;
    console.log(`Added player: ${name}`);
}

async function draftCreate(index, title, teams, order, picks) {
    const draft = new Draft({title: title, teams: teams, order: order, picks: picks});
    await draft.save();
    drafts[index] = draft;
    console.log(`Added draft: ${teams} teams, ${order} pick`);
}

async function createTeams() {
    console.log("Adding teams");
    await Promise.all([
        teamCreate(0, "Houston Texans", ["Demeco Ryans"] ), 
        teamCreate(1, "New England Patriots", ["Bill Bellicheck", "Bill O'Brien"]),
        teamCreate(2, "Minnesota Vikings", ["Kevin O'Connell"]),
        teamCreate(3, "Los Angeles Chargers", ["Brandon Staley"]),
        teamCreate(4, "Los Angeles Rams", ["Sean Mccvay"]),
        teamCreate(5, "San Francisco 49ers", ["Mike Shanahan"]),
        teamCreate(6, "Cincinatti Bengals", ["Zac Taylor"]),
        teamCreate(7, "Kansas City Chiefs", ["Andy Reid"]),
        teamCreate(8, "Atlanta Falcons", ["Arthur Smith"]),
        teamCreate(9, "Miami Dolphins", ["Mike McDaniels"]),
        teamCreate(10, "Indianapolis Colts", ["Shane Steichen"]),
        teamCreate(11, "Tennesee Titans", ["Mike Vrabel"]),
    ]);
}

async function createPositions() {
    console.log("Adding positions");
    await Promise.all([
        positionCreate(0, "Running Back"),
        positionCreate(1, "Wide Receiver"),
        positionCreate(2, "Quarterback"),
        positionCreate(3, "Tight End"),
    ]);
}

async function createPlayers() {
    console.log("Adding players");
    await Promise.all([
        playerCreate(0, "Justin Jefferson", teams[2], positions[1], "He cold"),
        playerCreate(1, "Austin Ekeler", teams[3], positions[0], "Catches too much"),
        playerCreate(2, "Cooper Kupp", teams[4], positions[1], "Cold"),
        playerCreate(3, "Christian Mccaffrey", teams[5], positions[0], "Cold"),
        playerCreate(4, "J'marr Chase", teams[6], positions[1], "Burr"),
        playerCreate(5, "Travis Kelce", teams[7], positions[3], "cheat code"),
        playerCreate(6, "Bijan Robinson", teams[8], positions[0], "actually?"),
        playerCreate(7, "Tyreek Hill", teams[9], positions[1], "cheetah"),
        playerCreate(8, "Jonathan Taylor", teams[10], positions[0], "get paid"),
        playerCreate(9, "Derrick Henry", teams[11], positions[0], "king henry"),
    ]);
}

async function createDrafts() {
    picks = [];
    for (let i = 0; i < players.length; i++) {
        picks.push(players[i]);
    }

    console.log("Adding drafts");
    await draftCreate(0, "Top 10 Picks 2023-24", "10", "8", picks);
}