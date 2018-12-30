const ytdl = require("ytdl-core");
const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("../config.json");
module.exports = {
  name: "play",
  description: `Play a YouTube video`,
  usage: `Use ${prefix}play <YouTube link> to play audo from a YouTube video in your current voice channel.\nUse ${prefix}sounds for a list of playable sounds.`,
  execute(message, args) {
    if (message.channel.type !== "text") return;

    const { voiceChannel } = message.member;

    if (!voiceChannel) {
      return message.reply("please join a voice channel first!");
    }

    const soundFiles = fs
      .readdirSync("./sounds")
      .filter(file => file.endsWith(".mp3"));
    console.log(soundFiles);
    for (let index = 0; index < soundFiles.length; index++) {
      //      sounds[index] = soundFiles[index].split(".")[0];
      //      message.channel.send(sounds.file);

      if (args[0] === soundFiles[index].split(".")[0]) {
        voiceChannel
          .join()
          .then(connection => {
            const dispatcher = connection.playFile(
              "sounds/" + soundFiles[index]
            );
            //message.channel.send("Now Playing: " + args);
            //message.channel.send("Channel ID: " + message.channel);
            dispatcher.on("end", () => {
              connection.disconnect();
            });
          })
          .catch(console.error);
      }
    }

    if (args[0] && ytdl.validateURL(args[0])) {
      voiceChannel.join().then(connection => {
        const vidID = ytdl.getURLVideoID(args[0]);
        ytdl.getInfo(vidID, (err, info) => {
          if (err) throw err;

          const vidInfoEmbed = new Discord.RichEmbed()
            .setColor("#0099ff")
            .setTitle("Now Playing: ")
            .setURL(args[0])
            .setAuthor(
              info.author.name,
              info.author.avatar,
              info.author.channel_url
            )
            .setDescription(info.title)
            .setThumbnail(info.thumbnail_url);

          message.channel.send(vidInfoEmbed);
        });

        let stream = ytdl(args[0],{
          filter: "audioonly"
        });

        const dispatcher = connection.playStream(stream);
        dispatcher.on("end", () => voiceChannel.leave());
      });
    } else {
      message.channel.send(
        `Invalid YouTube URL or sound. Use ${prefix}sounds to see a list of playable sound files. `
      );
    }

    if (!args.length) {
      message.channel.send(
       `Not enough arguments. Use ${prefix}play <sound> or !play <youtube-link>`
      );
    }
  }
};
