const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aplus')
		.setDescription('Sort du salon vocal'),
	async execute(interaction) {
		if (getVoiceConnection(interaction.member.voice.channel.guildId)) {
            getVoiceConnection(interaction.member.voice.channel.guildId).destroy();   
            await interaction.reply('g parti <:fantatete128:1128788526683656232>');
        }
        else {
			await interaction.reply('gros beta <:fantatete128:1128788526683656232>');
		}
	},
};