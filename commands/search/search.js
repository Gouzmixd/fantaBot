const { SlashCommandBuilder } = require('discord.js');
const GoogleImage = require('image-search-google');
const {cse, API_KEY} = require('./config.json');
const google = new GoogleImage(cse, API_KEY);
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Donne une image correspondant à la recherche')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Le truc à chercher')),
                
	async execute(interaction) {
		try {
            const input = interaction.options.getString('input');
            const pagenb = Math.floor(Math.random() * 3) + 1;
            console.log(pagenb);
			const results = await google.search(input, {page: 1});
			const length = results.length;
			const rep = results[Math.floor(Math.random() * length)];
			const embed = new EmbedBuilder()
				.setColor([205, 205, 205])
				.setTitle("Résultat pour \'" + input + "\' <:fantatete128:1128788526683656232>")
				.setImage(rep.url);

			interaction.reply({ embeds: [embed]});
		  }
		  catch (e) {
			console.error(e);
			interaction.reply("Faut mettre un input gros con <:fantatete128:1128788526683656232>");
		  }
	},
}