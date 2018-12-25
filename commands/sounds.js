const fs = require("fs");
const Discord = require("discord.js");

const { prefix } = require("../config.json");
module.exports = {
  name: "sounds",
  description: "Display list of playable sounds",
  usage: `Use ${prefix}sounds to display a list of all playable sounds \nUse ${prefix}play <soundname> to play a sound from the list.`,
  execute(message, args) {
    const soundFiles = fs
      .readdirSync("./sounds")
      .filter(file => file.endsWith(".mp3"));

    const exampleEmbed = new Discord.RichEmbed()
      .setColor("#0099ff")
      .setTitle("Available sounds")
      .setDescription("Use `play <sound name> to play an audio file.");

    let soundList = " ";
    for (let i = 0; i < soundFiles.length; i++) {
      soundList = soundList.concat(soundFiles[i].split(".")[0] + "\n");
    }
    exampleEmbed.fields.push({ name: "All sounds: ", value: soundList });
    message.channel.send(exampleEmbed);
  }
};
