const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Muestra información sobre el bot.'),
    async execute(interaction) {
        await interaction.reply('Soy un bot de prueba creado con Discord.js!');
    },
    category: 'Información', // Categoría del comando
};
