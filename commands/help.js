const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra una lista de todos los comandos disponibles.'),
    async execute(interaction) {
        const commands = interaction.client.commands;

        // Agrupa comandos por categoría
        const categorizedCommands = {};
        commands.forEach(command => {
            const category = command.category || 'Otros'; // Si no hay categoría, se pone 'Otros'
            if (!categorizedCommands[category]) {
                categorizedCommands[category] = [];
            }
            categorizedCommands[category].push({
                name: command.data.name,
                description: command.data.description,
            });
        });

        // Crea un mensaje bonito para mostrar la lista de comandos
        let helpMessage = '**Lista de comandos:**\n\n';
        for (const [category, cmds] of Object.entries(categorizedCommands)) {
            helpMessage += `**${category}**\n`;
            cmds.forEach(cmd => {
                helpMessage += `\`/${cmd.name}\`: ${cmd.description}\n`;
            });
            helpMessage += '\n';
        }

        // Responde al usuario
        await interaction.reply({ content: helpMessage, ephemeral: true });
    },
    category: 'General', // Categoría del comando
};
