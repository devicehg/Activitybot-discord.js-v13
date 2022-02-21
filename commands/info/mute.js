const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "mute",
    description: "mutes a member",
    run: async({client, message, args}) => {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(' ')
        const mutedRole = message.guild.roles.cache.find(role => role.name === "Muted")

        if(!mutedRole)
        return message.channel.send('**There is no muted role in this server! Make sure the muted role perm: Send message to off and in the text channel to off**')

        if(!mentionedMember) return message.reply('**Please specify a member!**')

        if(!message.member.permissions.has('MANAGE_ROLES')) {
            const muteError = new MessageEmbed()
            .setDescription('**You don\'t have permissions to mute members!**')
            .setColor('RED')
            return message.channel.send({ embeds: [muteError] })
        } else if(!message.guild.me.permissions.has('MANAGE_ROLE')) {
            const muteError1 = new MessageEmbed()
            .setDescription('**I don\'t have permissions to mute members!**')
            .setColor('RED')
            return message.channel.send({ embeds: [muteError1] })
        }

        const mentionedPosition = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPosition = message.guild.me.roles.highest.position


        if(memberPosition <= mentionedPosition) {
            const muteErr = new MessageEmbed()
            .setDescription('**You cannot mute this member because their role is higher/equal to yours!**')
            .setColor('RED')
            return message.channel.send({ embeds: [muteErr] })
        } else if (botPosition <= mentionedPosition) {
            const muteErr1 = new MessageEmbed()
            .setDescription('**I cannot mute this member because their role is higher/equal to mine!**')
            .setColor('RED')
            message.channel.send({ embeds: [muteErr1] })
        }

        try{
            const reasonDm = new MessageEmbed()
            .setTitle(`You were muted by ${message.author.tag}!`)
            .setDescription(`Reason: ${reason}`)
            .setColor('RED')
            await mentionedMember.send({ embeds: [reasonDm]})
            await mentionedMember.roles.add(mutedRole).then(() => {

                const muteSuccess = new MessageEmbed()
                .setTitle(`${mentionedMember.user.tag} was muted\nby ${message.author.tag}`)
                .setDescription(`Reason: ${reason}`)
                .setColor('RED')
                message.channel.send({ embeds: [muteSuccess] })
            })


        } catch (error) {
            const errorEmbed = new MessageEmbed()
            .setDescription(`:x: **There was an error while muting this user!**`)
            return message.channel.send({ embeds: [errorEmbed] })
        }
    }
}