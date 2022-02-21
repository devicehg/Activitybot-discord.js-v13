const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "membercount",
    description: "Count the member of members & bot in this server",
    run: async({client, message, args}) => {
        let embed = new MessageEmbed()
        .setTitle(`Total members`)
        .setColor('RANDOM')
        .setDescription(`Total Member🧍: ${message.guild.memberCount}`)
        .setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}