const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
    name: 'tts',
    description: 'Make the bot use TTS',
    usage:`Use ${prefix}tts <message> to make the bot read a message with Text-to-Speech.`,
    execute(message, args) {
        message.channel.send(args[0],{
            tts: true
        });
    },
};