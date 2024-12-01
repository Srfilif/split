# SplitBot - Discord Bot
<a href="https://github.com/Srfilif/split">
  <img alt="GitHub Stars" src="https://img.shields.io/github/stars/Srfilif/split?style=for-the-badge">
</a> 
<a href="https://github.com/Srfilif/split/network">
  <img alt="GitHub Forks" src="https://img.shields.io/github/forks/Srfilif/split?style=for-the-badge">
</a>

<h3 align="center">DISCORD SUPPORT</h3>
<div align="center"> 
  <a href="https://discord.gg/NPrGXMDrvZ">
    <img src="https://img.shields.io/discord/928405005646569522?label=discord&logo=Discord&style=for-the-badge" alt="Discord server" />
  </a>
</div>


 

SplitBot es un bot de Discord diseñado para gestionar comandos de manera eficiente. Con una estructura modular y fácil de configurar, SplitBot es perfecto para servidores de Discord que necesiten automatización y una amplia variedad de comandos personalizados. 

---
## Características

- Comandos personalizables para interactuar con los miembros del servidor.
- Soporte para comandos de ayuda dinámicos.
- Fácil integración con Discord API.
- Utiliza un sistema de configuración basado en archivos `.env` para mantener la seguridad de los tokens.
- Modularidad: Agrega fácilmente nuevos comandos y funcionalidades.

---

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Dependencias](#dependencias)
- [Configuración](#configuración)
- [Comandos](#comandos)
- [Licencia](#licencia)

---

## Instalación

Para instalar y ejecutar SplitBot en tu propio servidor, sigue estos pasos:

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local o servidor:
```
git clone https://github.com/Srfilif/split.git
cd split
```
### 2. Instalar las dependencias

Este bot utiliza `Node.js`, así que asegúrate de tenerlo instalado en tu sistema. Puedes instalar las dependencias utilizando `npm`:
```
npm install
```
### 3. Configuración del bot

1. Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales de Discord. Aquí tienes un ejemplo de cómo debe lucir el archivo `.env`:
```
DISCORD_TOKEN=tu_token_aqui
CLIENT_ID=tu_client_id_aqui
GUILD_ID=tu_guild_id_aqui
```
- `DISCORD_TOKEN`: El token de tu bot de Discord. Puedes obtenerlo desde el [Portal de desarrolladores de Discord](https://discord.com/developers/applications).
- `CLIENT_ID`: El ID de tu aplicación (bot) en Discord.
- `GUILD_ID`: El ID del servidor de Discord donde quieres que el bot esté activo.

### 4. Ejecutar el bot

Para iniciar el bot, usa el siguiente comando:
```
node index.js
```
---

## Dependencias

SplitBot utiliza las siguientes dependencias:

- **discord.js**: La librería principal para interactuar con la API de Discord.
- **@discordjs/rest**: Para manejar las interacciones con la API REST de Discord.
- **fs-extra**: Utilizada para manejar operaciones de archivos de forma más fácil.
- **dotenv**: Para cargar las variables de entorno desde el archivo `.env`.

Puedes instalar todas las dependencias con el siguiente comando:

npm install

---

## Configuración

### Comandos

SplitBot viene con un sistema de comandos modular. Los comandos se almacenan en la carpeta `commands/`. Puedes añadir nuevos comandos siguiendo la estructura básica de un archivo `.js` en esa carpeta.

Ejemplo de cómo se define un comando:
```
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde con Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
```
Cada comando tiene su propia definición y puede ejecutarse mediante interacciones de barra diagonal `/`.

---

## Comandos disponibles

- `/ping`: Responde con un mensaje "Pong!".
- `/help`: Muestra información sobre los comandos disponibles.

---

## Licencia

Este proyecto está bajo la licencia [MIT License](LICENSE).
