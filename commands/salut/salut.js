const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, createAudioResource, AudioPlayerStatus, joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('salut')
		.setDescription('Salut !!'),
	async execute(interaction) {
		if(!interaction.member.voice.channel) {
            return interaction.reply("Tu dois être dans un salon vocal <:fantatete128:1128788526683656232>")
        }

        const player = createAudioPlayer();

        player.on(AudioPlayerStatus.Playing, () => {
			console.log('The audio player has started playing!');
		});

		player.on('error', error => {
			console.error(`Error: ${error.message} with resource`);
		});

        var resource = 0;

        if(Math.random() < 0.75) {
            resource = createAudioResource('C:/Users/mattm/Desktop/fanta/commands/salut/salut.ogg');
        } else {
            resource = createAudioResource('C:/Users/mattm/Desktop/fanta/commands/salut/noschersvoisins.ogg');
        }
        

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.voice.channel.guild.id,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });

        const subscription = connection.subscribe(player);

        interaction.reply("g venu <:fantatete128:1128788526683656232>")
        
        player.play(resource);

        if (subscription) {
            // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
            setTimeout(() => subscription.unsubscribe(), 5_000);
        }

        setTimeout(() => connection.destroy(), 3_000);
	},
};