const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "raccoon",
    desc: "Команда для вывода енотиков",
    use: "raccoon",
    category: ":cat: Животные",
    aliases: [],

    async execute(client, message, args, data) {

        let res = await fetch('https://some-random-api.ml/img/raccoon/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`${message.guild.name}, енотики :)`)
                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}raccoon что бы посмотреть на енотиков ^-^` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admin: false
}