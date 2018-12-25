  const {insults} = require('../insults.json')
  const { prefix } = require("../config.json");
module.exports = {
  name: "insultplayer",
  description: "Random player insult",
  usage:`${prefix}insultplayer <name> will make the bot say the given name and say a random insult using TTS.`,
  execute(message, args) {
    let insult = insults[Math.floor(Math.random() * Math.floor(insults.length))]
    if(args[0]){
        insult = args[0] + ", " + insult
    }
    message.channel.send(insult, {
        tts: true
      });
    // args[0]

  }
};
