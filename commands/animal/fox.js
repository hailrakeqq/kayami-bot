const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "fox",
    desc: "Рандомные лисички",
    use: "fox",
    category: ":cat: Животные",
    aliases: [],
    async execute(message, client, args) {

        let res = await fetch('https://some-random-api.ml/img/fox/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .addFields([
                        {
                            name: `Команда: ${this.desc}`,
                            value: `${message.guild.name}, лисички :)`,
                            inline: false
                        }])

                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}fox что бы посмотреть на лисичек ^-^` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admin: false
}