const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "cats",
    desc: "Рандомные котики",
    use: "cats",
    category: ":cat: Животные",
    aliases: [],
    async execute(message, client, args) {

        let res = await fetch('https://some-random-api.ml/img/cat/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .addFields([
                        {
                            name: `Команда: ${this.desc}`,
                            value: `${message.guild.name}, котики :)`,
                            inline: false
                        }])
                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}cats что бы посмотреть на котиков ^-^` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admin: false
}