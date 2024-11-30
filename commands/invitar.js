const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invitar')
        .setDescription('Genera un enlace para invitar al bot a un servidor.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#00DCC4')
            .setTitle('¿Quieres invitarme?')
            .setDescription(`¡Estaré encantado de unirme a tu servidor y ayudarte! Usa los botones de abajo para invitarme o para votar por mí.`)
            .setTimestamp()
            .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
           // .setImage('https://cdn.discordapp.com/attachments/809100449511899138/927894357707739166/standard_1.gif');

        // Botón para invitar al bot
        const inviteButton = new ButtonBuilder()
            .setLabel('INVITAR')
            .setStyle(ButtonStyle.Link)
            .setEmoji('🧐')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=993575035145044068&permissions=8&scope=bot');

        // Botón para votar por el bot
    /*      const voteButton = new ButtonBuilder()
            .setLabel('VOTAR')
            .setStyle(ButtonStyle.Link)
            .setEmoji('👍')
            .setURL('https://top.gg/bot/839566503384317963/vote'); */	

        // Fila con los botones
        const row = new ActionRowBuilder().addComponents(inviteButton);

        // Responder la interacción con el embed y los botones
        await interaction.reply({ embeds: [embed], components: [row] });
    },
    category: 'Información',
};
