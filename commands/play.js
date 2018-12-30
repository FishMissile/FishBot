const ytdl = require("ytdl-core");
const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("../config.json");
const playlist = require("../playlist.js")

module.exports = {
  name: "play",
  description: `Play a YouTube video`,
  usage: `Use ${prefix}play <YouTube link> to play audo from a YouTube video in your current voice channel.\nUse ${prefix}sounds for a list of playable sounds.`,

  execute(message, args) {

    let soundcheck = null 
    if (message.channel.type !== "text") return;

    const { voiceChannel } = message.member;

    if (!voiceChannel) {
      return message.reply("please join a voice channel first!");
    }
    
    //soundFiles is an array of mp3 file names in the /sounds directory
    const soundFiles = fs
      .readdirSync("./sounds")
      .filter(file => file.endsWith(".mp3"));

    for (let index = 0; index < soundFiles.length; index++) {
      //loop through the list of files checking for a match
      if (args[0] === soundFiles[index].split(".")[0]) {
        soundcheck = true //an audio file matching the arguments given was found
        voiceChannel
          .join()
          .then(connection => {
            const dispatcher = connection.playFile(
              "sounds/" + soundFiles[index]
            );

            dispatcher.on("end", () => {
              connection.disconnect();
            });
          })
          .catch(console.error);
      }
    }

    if (args[0] && ytdl.validateURL(args[0])) {
      playlist.addurl(args[0],voiceChannel,message)
      

    } else if (soundcheck === false) {
      // if an audio file was not found or YT link is invalid.
      message.channel.send(
        `Invalid YouTube URL or sound. Use ${prefix}sounds to see a list of playable sound files. `
      );
    }

    if (!args.length) {
      //if there are no arguments given
      message.channel.send(
       `Not enough arguments. Use ${prefix}play <sound> or !play <youtube-link>`
      );
    }
  }
};
