const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Show the list of commands",
    run: async({client, message, args}) => {
        let embed = new MessageEmbed()
        .setTitle("List of commands")
        .setDescription(`**.avatar <tag a member, OPTIONAL>** - Displays user's avatar
        **.membercount** - Shows the ammount of members
        **.kick <tag a user> <reason>** - kicks a member
        **.ban <tag a user> <reason>** - bans a member
        **.unban <userID> <reason>** - unban a member
        **.snipe** - Snipe the latest deleted message
        **.poll <message>** - Creates a poll
        **.mute <tag a user> <reason>** - Mutes a member
        **.unmute <tag a user>** - Unmute a user
        **.meme** - Create a meme
        **.clear** - Delete multiple message at a time`)
        .setColor('AQUA')
        message.channel.send({ embeds: [embed] })
    }
}