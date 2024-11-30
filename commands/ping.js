const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde con Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
    category: 'Utilidad', // Categoría del comando
};
