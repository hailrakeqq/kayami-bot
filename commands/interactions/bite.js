const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "bite",
    desc: "укусить пользователя",
    use: "bite <@user>",
    category: ":people_with_bunny_ears_partying: Взаимодействия",
    aliases: [],

    async execute(message, client, args) {
        const url = `https://g.tenor.com/v1/random?q=animebite&key=${config.tenor}`
        const response = await fetch(url)
            .then(async response => {
                let mb = message.member;
                if (message.mentions.members.size > 0) mb = message.mentions.members.first()
                if (args[1] = '' || mb.id == message.author.id) message.reply('Ошибка, нужно тегнуть кого вы хотите укусить^.^')
                else {
                    const result = await response.json()
                    const index = Math.floor(Math.random() * result.results.length)
                    const gif = await result.results[index].media[0].gif.url
                    const embed = new MessageEmbed()
                        .setColor(config.color)
                        .setTitle(`${message.member.user.username} кусает ${mb.user.username} @__@`)
                        .setImage(gif)
                    message.channel.send({ embeds: [embed] });
                }
            })
    },
    admin: false
}