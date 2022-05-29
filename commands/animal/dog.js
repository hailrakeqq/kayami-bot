const { MessageEmbed } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.json');
const { admin } = require("./cat");

module.exports = {
    name: "dogs",
    desc: "Рандомные собачки ",
    use: "dogs",
    category: ":cat: Животные",
    aliases: [],

    async execute(message, client, args) {

        let res = await fetch('https://some-random-api.ml/img/dog/')
            .then(res => res.json()).then(json => {
                const embed = new MessageEmbed()
                    .setColor(config.color)
                    .addFields([
                        {
                            name: `Команда: ${this.desc}`,
                            value: `${message.guild.name}, собачки :)`,
                            inline: false
                        }])

                    .setImage(json.link)
                    .setFooter({ text: `Используйте ${config.prefix}dogs что бы посмотреть на собачек ^_^` })
                message.channel.send({ embeds: [embed] });
            });
    },
    admin: false
}