const Discord = require('discord.js');
const { prefix,token } = require('./config.json');

const client = new Discord.Client();

client.login(token);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'aoe') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        if(Number(args)>=1 && Number(args)<=42){
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();
                const dispatcher = connection.play(`./sounds/eoa2-taunt-spa/${args}.mp3`);
                dispatcher.setVolume(0.5);
                dispatcher.on('finish', () => {
                    console.log('Finished playing!');
                    });
            } else {
                message.reply('You need to join a voice channel first!');
            }
        }
        
    }
    
});
