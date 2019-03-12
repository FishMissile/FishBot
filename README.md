### Fishbot for Discord

Be sure to put your own Discord API token or set your own command prefix in `config.json`
```json
{
    "prefix": "!",
    "token": "YOUR_TOKEN_HERE"
}
```
Requirements:
64Bit Node.js
To stream audio from YouTube, the `ytld-core` requires [FFMpeg](https://www.ffmpeg.org/download.html#build-windows  "FFMpeg") for Windows.  
I had to install this manually as well as [Python 2.7.15](https://www.python.org/downloads/release/python-2715/ "Python 2.7.15")
In order to properly install node-gyp you will need to open Windows PowerShell as administrator and run `npm install --global --production windows-build-tools` before running `npm install` in the project folder.

Use `node .` to launch

Once it is up and running the default command prefix is `!`
                  
Use `!help` to display a list of commands.
                   
and `!help <command>` for more information on each command
 
 	= Command List =
    
    [Use `help <commandname> for details]
    
    help:: List all bot commands.
	insultplayer:: Random player insult
	join:: Tell the bot to join a voice channel.
	meme:: Display a random meme
	neojoke:: Random Neokramer joke
	ping:: Ping!
	play:: Play a YouTube video
	serverinfo:: Displays basic game server information.
	sounds:: Display list of playable sounds
	stop:: Stop current audio
	tts:: Make the bot use TTS

To add more sounds just drop new Mp3 files into the `/sounds` folder.

You can set the bot to play specific audio files when a certain user joins a voice channel by editing `users.json` and adding the persons name and the local file name. If a user joins who is not in the list, the bot will use Text-to-Speech to announce when they connect.
```json
{
         "joinsounds":{
             "username1": "sounds/sound1.mp3",
             "username2": "sounds/sound2.mp3",
             "username3": "sounds/sound3.mp3",
             "username4": "sounds/sound4.mp3",
             "username5": "sounds/sound5.mp3"
            }
}
```

see [Discord.js docs](https://discord.js.org/#/docs/main/stable/general/welcome "Discord.js") for more information on usage.
