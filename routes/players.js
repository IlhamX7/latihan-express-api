var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { player } = require("../models");

const v = new Validator();

router.get("/", async (req, res) => {
  const players = await player.findAll({
    attributes: ['id', 'name']
  });
  return res.json(players);
});

router.get("/:name", async (req, res) => {
  const players = await player.findOne({ where: { name: req.params.name } });
  return res.json(players || {});
});

router.post("/", async (req, res) => {
  const schema = {
    name: "string",
    game: "string",
    win: "number|optional",
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const players = await player.create(req.body);
  res.json(players);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  let Player = await player.findByPk(id);

  if (!Player) {
    return res.json({ message: "Player not found" });
  }

  const schema = {
    name: "string|optional",
    game: "string|optional",
    win: "number|optional",
  };
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  Player = await Player.update(req.body);
  res.json(Player);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  let players = await player.findByPk(id);

  if (!players) {
    return res.json({ message: "Player not found" });
  }

  await players.destroy();

  res.json({
    message: "Player is deleted",
  });
});

module.exports = router;