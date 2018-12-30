const { prefix } = require("../config.json");
const Gamedig = require("gamedig");
const Discord = require("discord.js");

module.exports = {
  name: "kf",
  description: "Retrieve Killing Floor 2server information",
  usage:
    "Use **!kf <IP> <PORT>** to retrieve info from a  Killing Floor server. Or use !KF JC to display the JC KF2 server.",
  execute(message, args) {
    let gameIP = "";
    let gamePort = "27015";
    function Query() {
      Gamedig.query(
        {
          type: "killingfloor2",
          host: gameIP,
          port_query: gamePort
          //host: "104.156.255.112",
          //port_query: "25010"
        },
        function(e, state) {
          if (e) {
            console.log("Server is offline");
            console.log(e);
          } else {
            console.log("Query Success!");
            var Difficulty = " ";

            console.log(state.players);
            //retrieve players
            /*                          
            for (let index = 0; index < state.players.length; index++) {
              //push players to playerlist
              serverinfo.playerlist.push(state.players[index]);
              //set gql index
            }  */
            console.log(state.raw.rules.Difficulty);
            const diff = state.raw.rules.Difficulty;
            if (diff == 0) {
              Difficulty = "Normal";
            } else if (diff == 1) {
              console.log("Difficulty: Hard");
              Difficulty = "Hard";
            } else if (diff == 2) {
              console.log("Difficulty: Suicidal");
              Difficulty = "Suicidal";
            } else if (diff == 3) {
              console.log("Difficulty: Hell on Earth");
              Difficulty = "Hell on Earth";
            } else {
              console.log("FAIL");
            }
            console.log(Difficulty);

            const Embed = new Discord.RichEmbed()
              .setTitle("Server Name")
              .setColor(65358)
              .setDescription(state.name)
              .addField("Map Name", state.map, true)
              .addField(
                "Current Players",
                state.raw.numplayers + "/" + state.maxplayers,
                true
              )
              .addField("Server Port", state.raw.rules.Port, true)
              .addField("Game Mode", state.raw.game, true)
              .addField(
                "Current Wave",
                state.raw.rules.CurrentWave + "/" + state.raw.rules.NumWaves,
                true
              )
              .addField("Game Difficulty", Difficulty, true)
              .addField("Zeds Left", state.raw.rules.ZedCound, true);
            var players = " ";
            for (let index = 0; index < state.players.length; index++) {
              //push players to playerlist
              players = players.concat(state.players[index].name + "\n");
              

              //serverinfo.playerlist.push(state.players[index]);
            }
            if (players.length > 1) {
              Embed.addField("Players", players, true);
            }

            message.channel.send(Embed);
          }
        }
      );
    }
    if (args[0] === "JC") {
      gameIP = "176.57.163.24";
      gamePort = "27015";
      Query();
    } else if (args[0]) {
      gameIP = args[0];
      if (args[1]) {
        gamePort = args[1];
      }

      console.log("Manual KF2 Query");
      Query();
    } else {
      message.channel.send("Incorrect command syntax. Use !7days <IP> <PORT>");
    }
  }
};
