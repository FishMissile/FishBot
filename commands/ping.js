const { prefix } = require("../config.json");
module.exports = {
  name: "ping",
  description: "Ping!",
  usage: `Use ${prefix}ping to test bot response.`,
  execute(message, args) {
    message.channel.send("Pong.");
  }
};
