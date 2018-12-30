const { prefix } = require("../config.json");
const playlist = require("../playlist.js")

module.exports = {
    name: 'clearq',
    description: 'Clears all YouTube videos from the playlist.',
    usage:`Use ${prefix}clearq to stop the current audio playing fom YouTube and clear any videos in the playlist.`,
    execute() {
        playlist.clear()
    },
};