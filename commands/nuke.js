const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Clona y elimina el canal actual.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const channel = interaction.channel;

        // Verificar si el miembro tiene permisos para gestionar canales
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            const embedNoPermissions = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('No tienes permisos para usar este comando.')
                .setColor('RED')
                .setTimestamp();

            return interaction.reply({ embeds: [embedNoPermissions], ephemeral: true });
        }

        try {
            // Clonar el canal actual
            const newChannel = await channel.clone();
            await newChannel.setPosition(channel.position);

            const embed = new EmbedBuilder()
                .setColor(16734430)
                .setTitle("Moderacion - Split BOT")
                .setDescription(`El canal ha sido nukeado por ${interaction.user.username}`)
                .setImage("https://i.gifer.com/6Ip.gif")
            .setFooter({ text: `Sistema de Moderacion - Split BOT`, iconURL: interaction.user.displayAvatarURL() })

                .setTimestamp();

            // Eliminar el canal original
            await channel.delete();

            // Enviar el embed al nuevo canal
            await newChannel.send({ embeds: [embed] });

            // Confirmar al usuario que el comando se ejecutó correctamente
            await interaction.reply({ content: 'El canal ha sido nukeado.', ephemeral: true });

        } catch (error) {
            console.error('Error al nuke el canal:', error);
            const embedError = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('Hubo un problema al intentar nuke el canal.')
                .setColor(16734430)
                .setTimestamp();

            await interaction.reply({ embeds: [embedError], ephemeral: true });
        }
    },
    category: 'Moderación',
};
