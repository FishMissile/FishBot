const { prefix } = require("../config.json");
const playlist = require("../playlist.js")

module.exports = {
    name: 'skip',
    description: 'Skip the current YouTube audio.',
    usage:`Use ${prefix}skip to skip the current audio playing from YouTube and play the next one in there queue if there is one.`,
    execute() {
        playlist.skip()
    },
};