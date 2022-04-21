const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "panda",
    desc: "Команда для вывода пандочек(^_^)",
    use: "panda",
    category: ":cat: Животные",
    aliases: [],

    async execute(client, message, args, data) {

        let res = await fetch('https://some-random-api.ml/img/panda/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`${message.guild.name}, пандочки :)`)
                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}panda что бы посмотреть на пандочек (^_^)` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admins: false
}