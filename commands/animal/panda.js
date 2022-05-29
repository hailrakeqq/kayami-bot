const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "panda",
    desc: "Рандомные панды",
    use: "panda",
    category: ":cat: Животные",
    aliases: [],

    async execute(message, client, args) {

        let res = await fetch('https://some-random-api.ml/img/panda/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .addFields([
                        {
                            name: `Команда: ${this.desc}`,
                            value: `${message.guild.name}, пандочки :)`,
                            inline: false
                        }])
                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}panda что бы посмотреть на пандочек (^_^)` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admins: false
}