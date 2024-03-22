const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meteo')
		.setDescription('Fanta est là pour vous proposer la météo du bitcoin')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Pour chercher une autre monnaie que le bitcoin')),
	async execute(interaction) {
		const bit = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
        console.log(bit.bitcoin);
	},
};