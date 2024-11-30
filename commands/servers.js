const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('Muestra una lista de servidores en los que el bot está - OWNER.'),
    async execute(interaction) {
        const ownerID = '992192916414005309'; // ID del owner
        const client = interaction.client;

        // Verificar que la persona que ejecuta el comando es el owner
        if (interaction.user.id !== ownerID) {
            return interaction.reply({ content: 'No tienes permiso para usar este comando.', ephemeral: true });
        }

        // Crear un array de servidores donde el bot está
        const servers = client.guilds.cache.map(guild => {
            return {
                name: guild.name,
                id: guild.id
            };
        });

        // Verificar si el bot está en servidores
        if (servers.length === 0) {
            return interaction.reply({ content: 'El bot no está en ningún servidor.', ephemeral: true });
        }

        // Crear la lista de servidores en formato numerado
        const serverList = servers.map((server, index) => {
            return `${index + 1}. ${server.name}`;
        }).join('\n');

        // Crear el embed con la lista de servidores
        const embed = new EmbedBuilder()
            .setColor(5814783)
            .setTitle('Servidores - Split BOT')
            .setDescription(`El bot esta en un total de **${servers.length}** servidores.\n\`\`\`${serverList}\`\`\``)
            .setFooter({ text: `Solicitado por ${interaction.user.tag}` })
            .setTimestamp();

        // Enviar el embed con la lista de servidores
        await interaction.reply({ embeds: [embed] });
    },
    category: 'Información',
};
