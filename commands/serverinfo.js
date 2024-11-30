const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Muestra información sobre el servidor."),
  async execute(interaction) {
    const { guild } = interaction;

    await interaction.reply({
      embeds: [
        {
          title: `Server Info - Split BOT`,
          description: `
**Nombre:** ${guild.name}
**ID del servidor:** ${guild.id}
**Dueño:** <@${guild.ownerId}>
**Miembros:** ${guild.memberCount}
**Canales:** ${guild.channels.cache.size}
**Fecha de creación:** <t:${Math.floor(guild.createdTimestamp / 1000)}:R>
                    `,
          color: 5814783,
          footer: {
            text: "Utiles - Split Bot - Developed by SrFilif",
          },
          thumbnail: {
            url: guild.iconURL({ dynamic: true }),
          },
        },
      ],
    });
  },
  category: "Información",
};
