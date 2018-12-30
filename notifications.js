const Discord = require("discord.js");

module.exports = {
  notify(client, user, channel) {
    const { joinsounds } = require("./users.json");
    //console.log(user)
    client.usersounds = new Discord.Collection();

    for (const user in joinsounds) {
      const sound = joinsounds[user];
      client.usersounds.set(user, sound);
    }

    if (client.usersounds.has(user)) {
      channel
        .join()
        .then(connection => {
          const filename = joinsounds.user;
          const dispatcher = connection.playFile(client.usersounds.get(user));
          //console.log(newMember.user);
          //client.channels.last().send(newMember.user + "User has Joined");
          dispatcher.on("end", () => {
            connection.disconnect();
          });
        })
        .catch(console.error);
    } else if(user !== client.user.username) {
      client.channels.first().send(user + " has joined the channel.", {
        tts: true
      });
    }
  }
};
