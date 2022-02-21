const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'snipe',
    description: 'Snipe the latest deleted message.',
    run: async({client, message, args}) => {
        const msg = client.snipes.get(message.channel.id)
        if(!msg) return message.channel.send("Didn't find any deleted messages.")

        const embed = new MessageEmbed()
        .setDescription(`**Snipe in <#${message.channel.id}>**\n\n` + 'Message: by: ' + `<@${msg.author}>` + '\nContent: \n' + msg.content)
        .setColor('AQUA')
        .setTimestamp()

        if(msg.image) embed.setImage(msg.image)
        message.channel.send({ embeds: [embed] })
    }
}