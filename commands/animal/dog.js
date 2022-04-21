const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json');
const { admin } = require("./cat");

module.exports = {
    name: "dogs",
    desc: "Команда для вывода собачек^_^",
    use: "dogs",
    category: ":cat: Животные",
    aliases: [],

    async execute(client, message, args, data) {

        let res = await fetch('https://some-random-api.ml/img/dog/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`${message.guild.name}, собачки :)`)
                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}dogs что бы посмотреть на собачек ^_^` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admin: false
}