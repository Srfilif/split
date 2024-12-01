require("dotenv").config({ path: "./config/config.env" });
const {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
} = require("discord.js");
const fs = require("fs-extra");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Cargar handlers
const { handleCommands } = require("./handlers/commandHandler");
handleCommands(client);

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);

  // Configurar estado con comandos sugeridos
  client.user.setPresence({
    activities: [
      {
        name: "tus comandos | /help",
        type: ActivityType.Playing,
        url: "https://example.com", // Puedes colocar un enlace si es Streaming
      },
    ],
    status: "online",
  });
});

client.login(process.env.DISCORD_TOKEN);
