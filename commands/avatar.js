const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Muestra el avatar de un usuario.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario del que quieres ver el avatar.')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('usuario') || interaction.user;
        const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

        await interaction.reply({
            embeds: [
                {
                    title: `Avatar - Split BOT`,
                    description: `Estas viendo la imagen de perfil del usuario: **${user.username}**\n\n[Click aquí para ver el avatar en tamaño completo.](${avatarUrl})`,
                    color: 5814783,
                    footer: {
                        text: "Sistema de Utiles - Split Bot - Developed by SrFilif"
                    },
                    image: {
                        url: avatarUrl
                      }
                    
                }
            ]
        });
    },
    category: 'Información',
};
