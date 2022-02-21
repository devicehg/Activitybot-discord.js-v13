const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "unban",
    description: "unban a member",
    run: async({client, message, args}) => {
        if(!args[0]) return message.reply('**Please specify a banned user ID!**')

        if(!message.member.permissions.has('BAN_MEMBERS')) {
            const unbanError = new MessageEmbed()
            .setDescription('**You don\'t have permissions to unban members!**')
            .setColor('RED')
            return message.channel.send({ embeds: [unbanError] })
        } else if(!message.guild.me.permissions.has('BAN_MEMBER')) {
            const unbanError1 = new MessageEmbed()
            .setDescription('**I don\'t have permissions to unban members!**')
            .setColor('RED')
            return message.channel.send({ embeds: [unbanError1] })
        }

        try{
            let user = await message.guild.members.unban(args[0])
            let unbanSuccess = new MessageEmbed()
            .setTitle(`${user.tag} was unbanned\nby ${message.author.tag}`)
            .setColor('AQUA')
            return message.channel.send({ embeds: [unbanSuccess] })
        } catch {
            let errorEmbed = new MessageEmbed()
            .setDescription(":x: **I couldn't unban the user or the user is not banned!**")
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}