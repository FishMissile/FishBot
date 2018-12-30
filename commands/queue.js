const { prefix } = require("../config.json");
const playlist = require("../playlist.js")

module.exports = {
    name: 'queue',
    description: 'List current audio queue',
    usage:`Use ${prefix}queue to show the current list of queued videos.`,
    execute(message) {
        playlist.queue(message)
    },
};