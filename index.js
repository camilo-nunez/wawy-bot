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

async function aoeMusic(message){
    const songs = [
        "Quest_for_Butter","Shamburger","I_Will_Beat_on_Your_Behind","Drizzle_(Firelight_Smoove_Mix)","Machina_del_Diablo","T_Station","Bass_Bag_(Album_Version)","Ride,_Lawrence,_Ride!","Smells_Like_Crickets,_Tastes_Like_Chicken","Operation_Monkey","Tazer","Uluzah","Carne_y_Helado","Rich_Corinthian_Leather","Where_Credit_is_Due","Joey_JoJo"
    ]

    const select = Math.floor(Math.random() * songs.length);

    if(message.member.voice.channel) {
        
        message.channel.send(`**Canción seleccionada ${songs[select]}**`);

        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(`./sounds/AoE-II-1999/${select}.ogg`);
        dispatcher.setVolume(0.5);
        dispatcher.on('finish', () => {
            console.log('Finished playing!');
        });
    } else {
        message.reply('¡Primero debes unirte a un canal de voz!');
    }
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
    .setImage('https://scontent-scl1-1.xx.fbcdn.net/v/t1.0-9/554023_555286944488125_1319107508_n.jpg?_nc_cat=107&_nc_oc=AQkszqOYJqDIJH6za61HgNrk1ZoriwneYoQxb-jUSC-kCZPTjwkY_fho26FpIJRClRM&_nc_ht=scontent-scl1-1.xx&oh=a97bd8e6744808a08bbee70971148f57&oe=5E640F71');
    
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
