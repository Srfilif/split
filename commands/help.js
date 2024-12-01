const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')  // El nombre del comando
        .setDescription('Muestra la lista de comandos disponibles'), // La descripción del comando
    async execute(interaction) {
        // Asegúrate de que la interacción solo sea respondida una vez
        try {
            // Si ya se ha respondido previamente a la interacción, evita hacer más respuestas.
            if (!interaction.deferred && !interaction.replied) {
                await interaction.reply({
                    content: 'Aquí tienes la lista de comandos:\n- `/help`: Muestra esta lista de comandos.\n- Otros comandos...',
                    ephemeral: true, // Opcional, solo el usuario que usó el comando puede verlo
                });
            }
        } catch (error) {
            console.error('Error al ejecutar el comando:', error);
            // Si algo sale mal, intenta usar editReply para cambiar la respuesta original
            if (interaction.replied) {
                await interaction.editReply({
                    content: "Hubo un error al ejecutar este comando.",
                    ephemeral: true,
                });
            }
        }
    },
};
