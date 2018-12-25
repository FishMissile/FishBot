const { prefix } = require("../config.json");

module.exports = {
    name: 'stop',
    description: 'Stop current audio',
    usage:`Use ${prefix}stop to force the bot to leave the current voice channel.`,
    execute(message, args) {
        if (message.channel.type !== 'text') return;

        const { voiceChannel } = message.member;

        if (!voiceChannel) {
            return message.reply('please join a voice channel first!');
        }

        voiceChannel.leave();

        message.channel.send('Pong.');
    },
};