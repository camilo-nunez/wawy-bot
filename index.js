const Discord = require('discord.js');
const { prefix,token } = require('./config.json');

const client = new Discord.Client();

var isReady = true;

client.once('ready', () => {
    console.log('Ready!');
    // Get the channel via ID
    // let channel = client.channels.get('81385020756865024');
    // Or via name (less persistent)
    let channel = client.channels.find('test-bot');

    channel.join()
    .then(connection => console.log('Connected'))
    .catch(console.error);
});

client.on('message', message => {
	if(message.content.startsWith(`${prefix}cmd1`)){
    const channel = message.member.voiceChannel;

    channel.join()
    .then(connection => console.log('Connected!'))
    .catch(console.error);
        
    // channel.join().then(connection => { // Connection is an instance of VoiceConnection
    //     console.log("Joined voice channel!");
    //     message.reply('Waddup');
    //     let file = path.resolve("./sounds/maledeath4.mp3")
    //     console.log("File: " + file);

    //     const dispatcher = connection.playFile(path);

    //     let start = 0;
    //     let end = 0;

    //     dispatcher.on('start', () => {
    //         start = new Date();
    //         start = start.getTime();
    //         connection.player.streamingData.pausedTime = 0;
    //         dispatcher.setVolume(0.70);
    //         console.log("Playing");

    //     });

    //     dispatcher.on('debug', (info) => {
    //         console.log("Debug: " + info);
    //     });

    //     dispatcher.on('end', reason => {
    //         console.log("Finished");
    //         end = new Date();
    //         end = end.getTime();
    //         console.log("Playtime: " + (end - start) + "ms");
    //         console.log("End: " + reason);
    //     });
    // });
        
        
    }

    
});

client.login(token);
