const { Client, GatewayIntentBits, ActivityType, Collection, Events } = require('discord.js');
const path = require('node:path');
const { token } = require('./config.json');
const fs = require('node:fs');
const GoogleImage = require('image-search-google');
const {cse, API_KEY} = require('./config.json');
const google = new GoogleImage(cse, API_KEY);

const bot = new Client({ intents: [ GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
console.log('Connexion au bot...');

bot.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			bot.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
		}
	}
}

bot.login(token).then(() => console.log('Connecté au bot !')).catch((error) => console.log('Impossible de se connecter au bot - ' + error));

bot.on('ready', () => { bot.user.setActivity({ type: ActivityType.Watching, name: `The Dream` });

    console.log('Le bot est prêt !');
});

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
})

bot.on('messageCreate', async (message) => {
    console.log(`new message on ${message.guild.id}`)
	if (Math.random() <= 0.1) {
        const results =  await google.search("TheFantasio974", {page: 1});
		const length = results.length;
		const rep = results[Math.floor(Math.random() * length)];
		message.reply(rep.url);
        console.log(`new message sent on ${message.guild.id}`)
	}	
});