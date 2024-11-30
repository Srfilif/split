const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs-extra');

const handleCommands = async (client) => {
    const commands = [];
    client.commands = new Map(); // Para almacenar los comandos con sus propiedades

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command); // Guarda el comando en el cliente
    }

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('Iniciando registro de comandos...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('Comandos registrados exitosamente.');
    } catch (error) {
        console.error('Error al registrar los comandos:', error);
    }

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
        }
    });
};

module.exports = { handleCommands };
