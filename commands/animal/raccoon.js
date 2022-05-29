const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json')

module.exports = {
    name: "raccoon",
    desc: "Рандомные енотики",
    use: "raccoon",
    category: ":cat: Животные",
    aliases: [],

    async execute(message, client, args) {

        let res = await fetch('https://some-random-api.ml/img/raccoon/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .addFields([
                        {
                            name: `Команда: ${this.desc}`,
                            value: `${message.guild.name}, енотики :)`,
                            inline: false
                        }])
                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}raccoon что бы посмотреть на енотиков ^-^` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admin: false
}