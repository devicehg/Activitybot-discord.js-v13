const { Client, Message, MessageEmbed } = require("discord.js")
module.exports = {
    name: "clear",
    description: "delete multiple message at a time",
    run: async({client, message, args}) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("You don't have permissions to clear messages!")
        if (!message.guild.me.permissions.has("MANAGE_MESSAGE")) return message.reply("I don't have permission to clear messages!")

        if (!args[0]) return message.channel.send("Please enter the amount that you want to delete!")
        if (isNaN(args[0])) return message.channel.send("Please enter a valid number!")

        if (args[0] > 100) return message.channel.send("You cannot delete messages more than 100 at a time!")
        if (args[0] < 1) return message.channel.send("You must delete atleast one message.")

        await message.channel.messages.fetch({ limit: args[0] }).then((msg) => {
            return message.channel.bulkDelete(msg, true)
        })
        const successClear = new MessageEmbed()
        .setTitle("Successfully deleted the message")
        .setColor("AQUA")
        await message.channel.send({ embeds: [successClear] })
    }
}