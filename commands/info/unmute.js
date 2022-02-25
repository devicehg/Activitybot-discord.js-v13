const { MessageEmbed, Message } = require("discord.js")

module.exports = {
    name: "unmute",
    description: "unmutes a user",
    run: async({client, message, args}) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const mutedRole = message.guild.roles.cache.find(role => role.name === "Muted")

        if(!mutedRole)
        return message.channel.send('There is no Muted role in this server!')
        
        if(!mentionedMember) return message.reply('**Please specify a member!**')
        

        if(!message.member.permissions.has('MANAGE_ROLES')) {
            const unmuteError = new MessageEmbed()
            .setDescription('**You don\'t have permissions to unmute members!**')
            .setColor('RED')
            return message.channel.send({ embeds: [unmuteError] })
        } else if(!message.guild.me.permissions.has('MANAGE_ROLE')) {
            const unmuteError1 = new MessageEmbed()
            .setDescription('**I don\'t have permissions to unmute members!**')
            .setColor('RED')
            return message.channel.send({ embeds: [unmuteError1] })
        }

        try{
            const reasonDm = new MessageEmbed()
            .setTitle(`You were unmuted by ${message.author.tag}!`)
            .setDescription(`You were unmuted!`)
            .setColor('AQUA')
            await mentionedMember.send({ embeds: [reasonDm]})
            await mentionedMember.roles.remove(mutedRole).then(() => {

                const unmuteSuccess = new MessageEmbed()
                .setTitle(`${mentionedMember.user.tag} was unmuted\nby ${message.author.tag}`)
                .setDescription(`${mentionedMember.user.tag} are unmuted!`)
                .setColor('AQUA')
                message.channel.send({ embeds: [unmuteSuccess] })
            })

        } catch {
            let errorEmbed = new MessageEmbed()
            .setDescription(":x: **I couldn't unmute the user or the user is not muted!**")
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}   
