const Discord = require("discord.js");
const { prefix } = require("../config.json");
module.exports = {
  name: "join",
  description: "Tell the bot to join a voice channel.",
  usage:`Use ${prefix}join to force the bot to join the channel you are currently in.`,
  execute(message, args) {
    if (message.channel.type !== "text") return;

    const { voiceChannel } = message.member;

    if (!voiceChannel) {
      return message.reply("please join a voice channel first!");
    }

    voiceChannel.join();
  }
};
