const express = require("express");
const router = express.Router();
const Player = require("../models/player");
//All Players Route

module.exports = (io) => {
  router.get("/", async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== "") {
      {
        searchOptions.name = new RegExp(req.query.name, "i");
      }
    }
    try {
      const players = await Player.find(searchOptions);
      console.log(players);
      if (req.query.name != null && req.query.name !== "") {
        res.json(players);
      } else {
        res.render("players/index", {
          players: players,
          searchOptions: req.query,
        });
      }
    } catch {
      res.redirect("/");
    }
  });

  //New Player Route
  router.get("/new", (req, res) => {
    res.render("players/new", { player: new Player() });
  });

  //Create Player Route
  router.post("/", async (req, res) => {
    const player = new Player({
      name: req.body.name,
      club: req.body.club,
      id: req.body.id,
      email: req.body.email,
      phone: req.body.phone,
    });
    try {
      const newPlayer = await player.save();
      //update all users through the socket:
      io.emit("update players", player);
      console.log("update");
      //res.redirect(`players/${newPlayer.id}`);
      res.redirect(`players`);
    } catch {
      res.render("players/new", {
        player: player,
        errorMessage: "Error creating players",
      });
    }
  });
  return router;
};
