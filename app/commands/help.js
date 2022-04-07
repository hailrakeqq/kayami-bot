const {MessageEmbed} = require("discord.js");
const fetch = require("../module/fetch")
const config = require("../../config.json")
module.exports = {
    name: "help",
    desc: "Команда для помощи по командам",
    use: "help [command]",

    async execute (client,message,args,data) {
        let prefix = config.prefix
        const logChannel = client.channels.cache.get('957691844437889134') 
        || client.channels.fetch('957691844437889134');
        if(!args[0]){
            return fetch.fetchCmdList(client, message, data)
        } else {
            let commd = await client.commands.get(args[0].toLowerCase())
            if(!commd) {
                return message.channel.send(`Не удалось найти команду: \`${args[0]}\``)
            }
            let embed = new MessageEmbed()
            .setTitle("Команды бота: ")
            .setDescription(`**Description:** ${commd.desc}\n**Usage: ** ${prefix}${commd.use}`)
            .setColor("#ff2474")
            
            return logChannel.send({embeds: [embed]})

        }
    }
}