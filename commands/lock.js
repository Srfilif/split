const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Cierra el canal actual para evitar que los miembros envíen mensajes.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const channel = interaction.channel;

        // Verificar si el canal ya está bloqueado
        const permissions = channel.permissionOverwrites.cache.get(interaction.guild.id);
        if (permissions && permissions.deny.has('SendMessages')) {
            const embedAlreadyLocked = new EmbedBuilder()
                .setTitle('Canal ya bloqueado')
                .setDescription(`🔒 El canal ${channel} ya está bloqueado.`)
                .setColor(16734430) // Color rojo
                .setTimestamp();

            return interaction.reply({ embeds: [embedAlreadyLocked], ephemeral: true });
        }

        // Bloquear el canal
        await channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: false,
        });

        const embedLocked = new EmbedBuilder()
            .setTitle('Actualización del Canal')
            .setDescription(`🔒 El canal ${channel} ha sido cerrado.`)
            .setColor(16734430) // Color rojo
            .setTimestamp();

        await interaction.reply({ embeds: [embedLocked] });
    },
    category: 'Moderación',
};
