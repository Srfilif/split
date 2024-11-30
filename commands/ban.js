const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banea a un usuario del servidor.')
        .addUserOption(option => option.setName('usuario').setDescription('Usuario a banear').setRequired(true))
        .addStringOption(option => option.setName('razon').setDescription('Razón del baneo').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const member = interaction.options.getMember('usuario');
        const razon = interaction.options.getString('razon') || 'Razón no especificada';

        // Verificar que el usuario no se haya mencionado a sí mismo
        if (member.id === interaction.user.id) {
            const embedSelfBan = new EmbedBuilder()
            .setTitle('Moderacion - Split BOT')
                .setDescription('No puedes banearte a ti mismo.')
            .setFooter({ text: `Sistema de Moderacion - Split BOT`, iconURL: interaction.user.displayAvatarURL() })

                .setColor(16734430)
                .setTimestamp();

            return interaction.reply({ embeds: [embedSelfBan], ephemeral: true });
        }

        // Verificar permisos del usuario que ejecuta el comando
        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            const embedNoPermissions = new EmbedBuilder()
            .setTitle('Moderacion - Split BOT')
                .setDescription('No tienes permisos para banear a este usuario.')
            .setFooter({ text: `Sistema de Moderacion - Split BOT`, iconURL: interaction.user.displayAvatarURL() })

                .setColor(16734430)
                .setTimestamp();

            return interaction.reply({ embeds: [embedNoPermissions], ephemeral: true });
        }

        // Verificar jerarquía de roles
        if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            const embedHigherRole = new EmbedBuilder()
            .setTitle('Moderacion - Split BOT')
                .setDescription('No puedes banear a este usuario ya que tiene un rango más alto que tu.')
            .setFooter({ text: `Sistema de Moderacion - Split BOT`, iconURL: interaction.user.displayAvatarURL() })

                .setColor(16734430)
                .setTimestamp();

            return interaction.reply({ embeds: [embedHigherRole], ephemeral: true });
        }

        // Verificar si el miembro puede ser baneado
        if (!member.bannable) {
            const embedCantBan = new EmbedBuilder()
            .setTitle('Moderacion - Split BOT')
                .setDescription('No puedo banear a este usuario.')
                .setColor(16734430)
            .setFooter({ text: `Sistema de Moderacion - Split BOT`, iconURL: interaction.user.displayAvatarURL() })

                .setTimestamp();

            return interaction.reply({ embeds: [embedCantBan], ephemeral: true });
        }

        // Realizar el baneo
        await member.ban({ reason: razon });

        const embedBanSuccess = new EmbedBuilder()
            .setTitle('Moderacion - Split BOT')
            .addFields(
                { name: 'Razón', value: razon },
            )
            .setColor(16734430)
            .setDescription(`¡Baneo exitoso!\n\nEl usuario ${member.tag} ha sido baneado.`)
            .setFooter({ text: `Sistema de Moderacion - Split BOT`, iconURL: interaction.user.displayAvatarURL() })

            .setTimestamp();

        // Intentar enviar mensaje directo al usuario baneado


        // Responder en el canal de texto
        await interaction.reply({ embeds: [embedBanSuccess] });
    },
    category: 'Moderación',
};
