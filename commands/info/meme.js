const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "meme",
    description: "create a meme",
    run: async({client, message, args}) => {
        fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(async json => {
            const memeEmbed = new Discord.MessageEmbed()
            .setTitle(json.title)
            .setImage(json.url)
            .setFooter(`${json.subreddit} ${json.postLink}`);

            let msg = await message.channel.send('Fetching you a meme...');
            message.channel.send({ embeds: [memeEmbed] })
        })
    }
}