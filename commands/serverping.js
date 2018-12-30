const { prefix } = require("../config.json");
const Gamedig = require("gamedig");
const Discord = require("discord.js");

module.exports = {
  name: "7days",
  description: "Retrieve JC 7dtd server information",
  usage: "Use **!7days <IP> <PORT>** to retrieve info from a 7 Days to Die server. Or use !7days JC to display the JC 7Days server.",
  execute(message, args) {
    let gameIP = "";
    let gamePort = "";
    let Query = () => {
      Gamedig.query(
        {
          type: "7d2d",
          host: gameIP,
          port_query: gamePort
          //host: "104.156.255.112",
          //port_query: "25010"
        },
        function(e, state) {
          if (e) console.log("Server is offline");
          else {
            console.log("Query Success!");
            let sdtdplayers = [];
            serverinfo = [
              {
                mapname: "",
                id: 1,
                difficulty: "",
                gamemode: "",
                servername: "",
                currentwave: "",
                maxwaves: ""
              }
            ];
            for (key in state.players[0]) {
              console.log(key);
            }
            console.log(state.raw);

            const Embed = new Discord.RichEmbed()
            .setTitle("Server Name")
            .setColor(65358)
            .setDescription(state.name)
            .setThumbnail("https://user-images.githubusercontent.com/6136865/29045114-9ae8e510-7bc2-11e7-8487-19552001aafd.png")
            .addField("Map Name",state.map != "Navazgane" ? "Random Gen: " + state.map : "Navezgane",true)
            .addField("Current Players",state.raw.numplayers + "/" + state.maxplayers,true)
            .addField("Server IP",state.raw.rules.IP,true)
            .addField("Server Port",state.raw.rules.Port,true)
            .addField("Game Version",state.raw.rules.Version,true)
            .addField("Loot Respawn Days",state.raw.rules.LootRespawnDays,true)
            .addField("Loot Abundance",state.raw.rules.LootAbundance + "%",true)
            .addField("Game Difficulty",state.raw.rules.GameDifficulty,true)
            .addField("BloodMood Zeds",state.raw.rules.BloodMoonEnemyCount,true)
            .addField("Block Durability Modifier",state.raw.rules.BlockDurabilityModifier,true)

            serverinfo.mapname = state.map;
            message.channel.send(Embed);
          }
        }
      );
    };
    if (args[0] === "JC") {
      gameIP = "104.156.255.112";
      gamePort = "25010";
      Query();
    } else if (args[0] && args[1]) {
      gameIP = args[0];
      gamePort = args[1];
      Query();
    } else {
      message.channel.send("Incorrect command syntax. Use !7days <IP> <PORT>");
    }
  }
};
