const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "randanimal",
    desc: "Рандомные животные",
    use: "randanimal",
    category: ":cat: Животные",
    aliases: [],

    async execute(message, client, args) {
        const url = `https://g.tenor.com/v1/random?q=animal&key=${config.tenor}`
        const response = await fetch(url)
            .then(async response => {
                const result = await response.json()
                const index = Math.floor(Math.random() * result.results.length)
                const gif = await result.results[index].media[0].gif.url
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .addFields([
                        {
                            name: `Команда: ${this.desc}`,
                            value: `${message.guild.name}, тваринки :)`,
                            inline: false
                        }])
                    .setImage(gif)
                    .setFooter({ text: `Используйте ${config.prefix}randanimal что бы посмотреть на рандомных животных! ^-^` })

                message.channel.send({ embeds: [embed] });
            })
    },
    admin: false,
}