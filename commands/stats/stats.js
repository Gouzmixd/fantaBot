const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Donne la version discord.js'),
	async execute(interaction) {
        await interaction.reply(`${require("discord.js/package.json").version}`);
	},
};