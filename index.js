const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs-extra");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// Cargar comandos
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Cargar handlers
const { handleCommands } = require("./handlers/commandHandler");
handleCommands(client);

client.once("ready", () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

client.login("BOT_TOKEN");
