var imgur = require('imgur');

const { prefix } = require("../config.json");
module.exports = {
    name: "meme",
    description: "Display a random meme",
    usage:`${prefix}meme will play post a random meme in a text channel.`,
    execute(message, args) {
        imgur.setClientId('60d6f3f241d329f');
        imgur.setAPIUrl('https://api.imgur.com/3/');
        var query = 'meme';
        var optionalParams = {sort: 'top', dateRange: 'day', page: 1}
        imgur.search(query, optionalParams)
            .then(function(json) {
                const randommeme = json.data[Math.floor(Math.random() * Math.floor(json.data.length))].link
                message.channel.send(randommeme);
                console.log(randommeme);
            })
            .catch(function (err) {
                console.error(err);
            });
  
    }
  };
  