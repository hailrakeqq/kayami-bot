const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "fox",
    desc: "Команда для вывода лисичек",
    use: "fox",
    category: ":cat: Животные",
    aliases: [],
    async execute(client, message, args, data) {

        let res = await fetch('https://some-random-api.ml/img/fox/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`${message.guild.name}, лисички :)`)
                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}fox что бы посмотреть на лисичек ^-^` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admin: false
}