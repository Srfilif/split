const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addemoji')
        .setDescription('Añade un emoji existente o un nuevo emoji al servidor.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEmojisAndStickers)
        .addStringOption(option =>
            option
                .setName('emoji')
                .setDescription('El emoji que deseas agregar (puede ser personalizado o predeterminado).')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('nombre')
                .setDescription('El nombre del nuevo emoji (opcional si el emoji es existente).')
                .setRequired(false)),
    async execute(interaction) {
        const inputEmoji = interaction.options.getString('emoji');
        const nombre = interaction.options.getString('nombre');

        // Verificar si el usuario tiene permisos
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers)) {
            const embedNoPermissions = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('No tienes permisos para agregar emojis al servidor.')
                .setColor('RED')
                .setTimestamp();

            return interaction.reply({ embeds: [embedNoPermissions], ephemeral: true });
        }

        // Procesar el emoji
        const customEmojiMatch = inputEmoji.match(/<:(\w+):(\d+)>/);
        const animatedEmojiMatch = inputEmoji.match(/<a:(\w+):(\d+)>/);
        let emojiURL, emojiName;

        if (customEmojiMatch || animatedEmojiMatch) {
            // Si es un emoji personalizado
            const isAnimated = Boolean(animatedEmojiMatch);
            const id = isAnimated ? animatedEmojiMatch[2] : customEmojiMatch[2];
            const baseURL = `https://cdn.discordapp.com/emojis/${id}`;
            emojiURL = isAnimated ? `${baseURL}.gif` : `${baseURL}.png`;
            emojiName = nombre || (isAnimated ? animatedEmojiMatch[1] : customEmojiMatch[1]);
        } else if (/^[\p{Emoji}]+$/u.test(inputEmoji)) {
            // Si es un emoji predeterminado
            const embedDefault = new EmbedBuilder()
                .setTitle('No se puede añadir')
                .setDescription('No puedes agregar emojis predeterminados de Discord a este servidor.')
                .setColor('RED')
                .setTimestamp();

            return interaction.reply({ embeds: [embedDefault], ephemeral: true });
        } else {
            // Si no es un emoji válido
            const embedInvalid = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('El emoji proporcionado no es válido. Asegúrate de que sea un emoji existente o personalizado.')
                .setColor('RED')
                .setTimestamp();

            return interaction.reply({ embeds: [embedInvalid], ephemeral: true });
        }

        try {
            // Crear el emoji en el servidor
            const emoji = await interaction.guild.emojis.create({ attachment: emojiURL, name: emojiName });

            const embedSuccess = new EmbedBuilder()
                .setColor('#00DCC4')
                .setTitle('¡Emoji Agregado!')
                .setDescription(`> <@${interaction.user.id}>, el emoji ${emoji} ha sido agregado correctamente al servidor.`)
                .setTimestamp();

            await interaction.reply({ embeds: [embedSuccess] });
        } catch (error) {
            console.error('Error al agregar el emoji:', error);
            const embedError = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('Hubo un problema al intentar agregar el emoji. Verifica que el servidor no haya alcanzado el límite de emojis o que el enlace sea válido.')
                .setColor('RED')
                .setTimestamp();

            await interaction.reply({ embeds: [embedError], ephemeral: true });
        }
    },
    category: 'Configuración',
};
