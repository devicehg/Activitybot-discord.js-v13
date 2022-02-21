const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
    ]
})

const PREFIX2 = "."

let bot = {
    client,
    prefix: ".",
    owners: ["769949670788825119"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)


client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

client.snipes = new Map()
client.on('messageDelete', function(message, channel) {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.id,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

client.on("ready", () => {
    console.log("Activity bot is ready!")
    client.user.setActivity(".help", { type: "LISTENING" })
})

client.on("messageCreate", async (msg) => {
    if (!msg.content.startsWith(PREFIX2)) return;
    const args = msg.content.slice(PREFIX2.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'poll'){
        let message = await msg.reply(args.join(' '));
        await message.react("👍")
        await message.react("👎")
    }
})

client.login(process.env.TOKEN)