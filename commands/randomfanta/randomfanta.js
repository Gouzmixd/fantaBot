const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const GoogleImage = require('image-search-google');
const {cse, API_KEY} = require('.../config.json');
const google = new GoogleImage(cse, API_KEY);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomfanta')
		.setDescription('Un fanta (ou bob) aléatoire arrive !'),
	async execute(interaction) {
		try {
			const results = await google.search("TheFantasio974", {page: Math.floor(Math.random() * 10) + 1});
			const length = results.length;
			const rep = results[Math.floor(Math.random() * length)];
			const embed = new EmbedBuilder()
				.setColor([205, 205, 205])
				.setTitle("Random Fanta <:fantatete128:1128788526683656232>")
				.setImage(rep.url);

			interaction.reply({ embeds: [embed]});
		  }
		  catch (e) {
			console.error(e);
			interaction.reply("Error happened, see the console");
		  }
	}
};