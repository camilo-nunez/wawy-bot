const Discord = require('discord.js');
const { prefix,token } = require('./config.json');

const client = new Discord.Client();

client.login(token);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	if(message.content.startsWith(`${prefix}cmd1`)){
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play('./sounds/maledeath4.mp3');
            dispatcher.on('finish', () => {
                console.log('Finished playing!');
              });
          } else {
            message.reply('You need to join a voice channel first!');
          }
        
    }
    
});
