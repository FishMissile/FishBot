const ytdl = require("ytdl-core");
const Discord = require("discord.js");

module.exports = {
  tracklist: [],
  clearq: false,
  skipped: false,
  addurl(url, vc, msg) {
    const currentlist = this.tracklist;
    console.log("song added");
    currentlist.push([url, vc, msg]);
    if (currentlist.length === 1) {
      this.play(currentlist[0][0], currentlist[0][1], currentlist[0][2]);
      console.log(currentlist);
    }
  },
  queue(msg) {
    const currentlist = this.tracklist;
    console.log("show queue");

    let queueEmbed = new Discord.RichEmbed()
      .setColor("#0099ff")
      .setTitle("Current List: ");

    for (let i = 0; i < currentlist.length; i++) {
      const vidID = ytdl.getURLVideoID(currentlist[i][0]);
      ytdl.getInfo(vidID, (err, info) => {
        if (err) throw err;
        console.log("Add Field");
        queueEmbed.addField(info.title, info.author.name);
      });

      console.log("Track: " + currentlist[i]);
    }
    setTimeout(() => {
      msg.channel.send(queueEmbed);
    }, 2000);
  },

  play(url, voiceChannel, message) {
    const currentlist = this.tracklist;
    voiceChannel.join().then(connection => {
      const vidID = ytdl.getURLVideoID(url);
      ytdl.getInfo(vidID, (err, info) => {
        if (err) throw err;

        const vidInfoEmbed = new Discord.RichEmbed()
          .setColor("#0099ff")
          .setTitle("Now Playing: ")
          .setURL(url)
          .setAuthor(
            info.author.name,
            info.author.avatar,
            info.author.channel_url
          )
          .setDescription(info.title)
          .setThumbnail(info.thumbnail_url);

        message.channel.send(vidInfoEmbed);
      });

      let stream = ytdl(url, {
        filter: "audioonly"
      });

      const dispatcher = connection.playStream(stream);
      if (currentlist.length) {
        currentlist[0].push(dispatcher);
      }

      dispatcher.on("end", () => {
        this.tracklist.shift();
        if (currentlist.length) {
          if (this.clearq === false) {
            if (this.skipped === false) {
              setTimeout(() => {
                this.play(
                  currentlist[0][0],
                  currentlist[0][1],
                  currentlist[0][2]
                );
              }, 1000);
            } else {
              setTimeout(() => {
                this.play(
                  currentlist[0][0],
                  currentlist[0][1],
                  currentlist[0][2]
                );
              }, 2000);
              this.skipped = false;
            }
          } else {
            this.tracklist = [];
            this.clearq = false;
          }
        }
        voiceChannel.leave();
      });
    });
  },
  skip() {
    const currentlist = this.tracklist;
    this.skipped = true;
    currentlist[0][3].end("Track Skipped");
  },
  clear() {
    let currentlist = this.tracklist;
    this.clearq = true;
    if (currentlist[0][3]) {
      currentlist[0][3].end("Queue Cleared");
    }
  }
};
