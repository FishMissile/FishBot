const { prefix } = require("../config.json");
module.exports = {
  name: "serverinfo",
  description: "Displays basic game server information.",
  usage:`Use ${prefix}serverinfo to display basic server information for any existing JC game servers.`,
  execute(message, args) {
    message.channel.send({
      embed: {
        title: "**__Goxland Killing Floor 2__**",
        color: 1908658,
        fields: [
          {
            name: "IP:",
            value: "```\ngoxland.dyndns.org```"
          },
          {
            name: "Port:",
            value: "```\n7707```"
          }
        ]
      }
    });
    message.channel.send({
      embed: {
        title: "**__JC 7 Days to Die__**",
        color: 1908658,
        fields: [
          {
            name: "IP:",
            value: "```\n104.156.255.112```"
          },
          {
            name: "Port:",
            value: "```\n25010```"
          }
        ]
      }
    });
  }
};
