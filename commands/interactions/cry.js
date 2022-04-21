const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "cry",
    desc: "заплакать",
    use: "cry",
    category: ":people_with_bunny_ears_partying: Взаимодействия",
    aliases: [],

    async execute(message, client, args) {
        const url = `https://g.tenor.com/v1/random?q=animecry&key=${config.tenor}`
        const response = await fetch(url)
            .then(async response => {
                const result = await response.json()
                const index = Math.floor(Math.random() * result.results.length)
                const gif = await result.results[index].media[0].gif.url
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`${message.author.username} плачет...`)
                    .setImage(gif)
                message.channel.send({ embeds: [embed] });
            })
    },
    admin: false
}