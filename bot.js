const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const notifications = require("./notifications.js");

const client = new Discord.Client({ fetchAllMembers: true });
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));//returns an array of filenames from files ending with *.js

for (const file of commandFiles) {//for each item in array
  const command = require(`./commands/${file}`); //extract command from filename
  client.commands.set(command.name, command); // set commands in Discord.js collection
}

client.once("ready", () => {
  //console.log(client.channels.first());
  console.log("FishBot is Ready!");
});

client.on("voiceStateUpdate", (oldMember, newMember) => {//User enter/leaves event
  let newUserChannel = newMember.voiceChannel; // Voice channel that the user entered
  let oldUserChannel = oldMember.voiceChannel; // Voice channel that the user left

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    // User Joins a voice channel

    notifications.notify(client, newMember.user.username, newUserChannel);
    /* if (newMember.user.username == 'FishMissile') {
      newUserChannel
      .join()
      .then(connection => {
        const dispatcher = connection.playFile("sounds/bunghole.mp3");
        //console.log(newMember.user);
        //client.channels.last().send(newMember.user + "User has Joined");
        console.log(newMember.user.username)
        
      })
      .catch(console.error);
     } */
  } else if (newUserChannel === undefined) {
    // User leaves a voice channel
    if(newMember.user.username !== client.user.username){//user is not Fishbot
    client.channels.first().send(newMember.user.username + " has left the channel.", {
      tts: true
    });}
  }
});
client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args,client, prefix);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(token);
