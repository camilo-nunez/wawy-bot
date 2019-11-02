const Discord = require('discord.js');
const { prefix,token } = require('./config.json');

const client = new Discord.Client();

client.login(token);

client.once('ready', () => {
	console.log('Ready!');
});

function aoeClear(message){
    message.channel.bulkDelete(100, true);
}

function aoeMusic(message){
    return message.channel.send(`En desarrollo..., ${message.author}!`);
}

async function aoeChat(number, message){
    const numero = parseInt(number)
    if(numero > 42 || numero < 1){
        return message.channel.send(`No proporcionaste un número válido, ${message.author}!`);
    }
    else if(message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(`./sounds/eoa2-taunt-spa/${number}.mp3`);
        dispatcher.setVolume(0.5);
        dispatcher.on('finish', () => {
            console.log('Finished playing!');
            });
    } else {
        message.reply('¡Primero debes unirte a un canal de voz!');
    }
}

function aoeHelp(message){
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Comandos')
	.setURL('https://github.com/camilo-nunez/wawy-bot')
	.setDescription('Bot qlo en honor a Wawito que en paz descanse.')
	.addField('**help**','Lista de comandos')
	.addField('**aoe <Número>** (Entre 1 y 42, inclusive)','Reproduce audio del chat de AoC')
    .addField('**aoe music**','En desarrollo...')
    .addField('**clear**', 'Borra los últimos 100 mensajes!')
    
    return message.channel.send(helpEmbed);
}

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    console.log("args: "+args[0]);
    console.log("command: "+command);

    if (command === 'clear') aoeClear(message);
    else if (command === 'aoe') {
        if (!args.length) return message.channel.send(`No proporcionaste ningún argumento, ${message.author}!`);
        else if(Number.isInteger(parseInt(args[0]))) aoeChat(args[0],message);
        else if(args[0] === 'music') aoeMusic(message);
        else return message.channel.send(`No proporcionaste ningún argumento válido, ${message.author}!`);
    }
    else if(command === 'help') aoeHelp(message);
    else return message.channel.send(`No proporcionaste ningún comando válido , ${message.author}!`);
});
