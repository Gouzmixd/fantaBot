const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('infos')
		.setDescription('Donne les infos personnelles du minecraft wiki'),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
            .setTitle('TheFantasio974 <:fantatete128:1128788526683656232>')
	        //.setURL('https://https://minecraft.fandom.com/fr/wiki/TheFantasio974/')
            .setAuthor({ name: 'Minecraft Wiki', iconURL: 'https://static.wikia.nocookie.net/minecraft_fr_gamepedia/images/e/e6/Site-logo.png/revision/latest?cb=20220209170342', url: 'https://minecraft.fandom.com/fr/' })
	        .setColor([205, 205, 205])
            .setImage('https://media.tenor.com/HY3l9eRDqx4AAAAM/fanta-cest-pas-toi-qui-d%C3%A9cide.gif')
	        .addFields(
	        	{ name: "Nom réel", value: "Gabriel Chevillard" },
                { name: "Date de naissance", value: "12 septembre 1978" },
                { name: "Surnom(s)", value: "Fanta, Fanfan, Failtasio" },
                { name: "Nationalité", value: "Française" },
                { name: "Poste", value: "Ex-Vidéaste" },
                { name: "Chaîne Youtube", value: "[Cliquez-ici](https://www.youtube.com/results?search_query=TheFantasio974)" },
	        )
            .setThumbnail('https://static.wikia.nocookie.net/minecraft_fr_gamepedia/images/c/c7/TheFantasio974.png/revision/latest/scale-to-width-down/150?cb=20110815233029')
            .setFooter({ text: "C'est lui qui décide", iconURL: 'attachment://TheFantasio974.png'});

        await interaction.reply({ embeds: [exampleEmbed]});
	},
};