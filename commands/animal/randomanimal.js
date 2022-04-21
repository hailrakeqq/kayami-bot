const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "randanimal",
    desc: "рандомные животные",
    use: "randanimal",
    category: ":cat: Животные",
    aliases: [],

    async execute(client, message, args, data) {
        const url = `https://g.tenor.com/v1/random?q=animal&key=${config.tenor}`
        const response = await fetch(url)
            .then(async response => {
                const result = await response.json()
                const index = Math.floor(Math.random() * result.results.length)
                const gif = await result.results[index].media[0].gif.url
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`${message.guild.name}, тваринки :)`)
                    .setImage(gif)
                    .setFooter({ text: `Используйте ${config.prefix}rAnimal что бы посмотреть на рандомных животных! ^-^` })

                message.channel.send({ embeds: [embed] });
            })
    },
    admin: false,
}