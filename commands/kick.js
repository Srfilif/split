const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulsa a un miembro del servidor.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('El usuario que deseas expulsar.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('razon')
                .setDescription('La razón de la expulsión.')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('usuario');
        const reason = interaction.options.getString('razon') || 'No especificada';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: 'El usuario no está en el servidor.', ephemeral: true });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({ content: 'No puedes expulsarte a ti mismo.', ephemeral: true });
        }

        try {
            await member.kick(reason);
            const embed = new EmbedBuilder()
                .setColor(16734430)
                .setTitle('Moderacion - Split BOT')
                .setDescription(`<@${user.id}> fue expulsado del servidor.\n**Razón:** ${reason}`)
            .setFooter({ text: `Sistema de Moderacion - Split BOT`, iconURL: interaction.user.displayAvatarURL() })

                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder()
                .setColor(16734430)
                .setTitle('Moderacion - Split BOT')
                .setDescription('No pude expulsar a este usuario. Puede que sea un administrador o que no tengas los permisos necesarios.')
            .setFooter({ text: `Sistema de Moderacion - Split BOT`, iconURL: interaction.user.displayAvatarURL() })

                .setTimestamp();
                
            await interaction.reply({ embeds: [embed] });
        }
    },
    category: 'Moderación',
};
