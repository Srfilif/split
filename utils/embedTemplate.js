const { EmbedBuilder } = require('discord.js');

/**
 * Crea un embed estándar para los comandos
 * @param {string} commandName - Nombre del comando
 * @param {string} description - Descripción del contenido
 * @param {string} version - Versión del bot
 * @returns {EmbedBuilder} - Embed generado
 */
function createEmbed(commandName, description, version) {
    return new EmbedBuilder()
        .setTitle(`${commandName} - Split v.${version}`)
        .setDescription(description)
        .setColor(5814783)
        .setFooter({ text: 'Comando - Split Bot - Developed by SrFilif' });
}

module.exports = { createEmbed };
