const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "kick",
    description: "kicks a member",
    run: async({client, message, args}) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(' ')

        if(!mentionedMember) return message.reply('**Please specify a member!**')

        if(!message.member.permissions.has('KICK_MEMBERS')) {
            const kickError = new MessageEmbed()
            .setDescription('**You don\'t have permissions to kick members!**')
            .setColor('RED')
            return message.channel.send({ embeds: [kickError] })
        } else if(!message.guild.me.permissions.has('KICK_MEMBER')) {
            const kickError1 = new MessageEmbed()
            .setDescription('**I don\'t have permissions to kick members!**')
            .setColor('RED')
            return message.channel.send({ embeds: [kickError1] })
        }

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPosition = message.guild.me.roles.highest.position


        if(memberPosition <= mentionedPosition) {
            const kickErr = new MessageEmbed()
            .setDescription('**You cannot kick this member because their role is higher/equal to yours!**')
            .setColor('RED')
            return message.channel.send({ embeds: [kickErr] })
        } else if (botPosition <= mentionedPosition) {
            const kickErr1 = new MessageEmbed()
            .setDescription('**I cannot kick this member because their role is higher/equal to mine!**')
            .setColor('RED')
            message.channel.send({ embeds: [kickErr1] })
        }

        try{
            const reasonDm = new MessageEmbed()
            .setTitle(`You were kicked by ${message.author.tag}!`)
            .setDescription(`Reason: ${reason}`)
            .setColor('RED')
            await mentionedMember.send({ embeds: [reasonDm]})
            await mentionedMember.kick().then(() => {

                const kickSuccess = new MessageEmbed()
                .setTitle(`${mentionedMember.user.tag} was kicked\nby ${message.author.tag}`)
                .setDescription(`Reason: ${reason}`)
                .setColor('RED')
                message.channel.send({ embeds: [kickSuccess] })
            })


        } catch (error) {
            const errorEmbed = new MessageEmbed()
            .setDescription(`:x: **There was an error while kicking this user!**`)
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}