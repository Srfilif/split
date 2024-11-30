const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Abre el canal actual para permitir que los miembros envíen mensajes.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const channel = interaction.channel;

        // Verificar si el canal ya está desbloqueado
        const permissions = channel.permissionOverwrites.cache.get(interaction.guild.id);
        if (permissions && permissions.allow.has('SendMessages')) {
            const embedAlreadyUnlocked = new EmbedBuilder()
                .setTitle('Canal ya desbloqueado')
                .setDescription(`🔓 El canal ${channel} ya está desbloqueado.`)
                .setColor(16734430)
                .setTimestamp();

            return interaction.reply({ embeds: [embedAlreadyUnlocked], ephemeral: true });
        }

        // Desbloquear el canal
        await channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: true,
        });

        const embedUnlocked = new EmbedBuilder()
            .setTitle('Actualización del Canal')
            .setDescription(`🔓 El canal ${channel} ha sido abierto.`)
            .setColor(16734430)
            .setTimestamp();

        await interaction.reply({ embeds: [embedUnlocked] });
    },
    category: 'Moderación',
};
