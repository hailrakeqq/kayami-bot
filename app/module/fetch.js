const {MessageEmbed} = require("discord.js");
const config = require('../../config.json')
module.exports.fetchCmdList = async (client, message, data) => {
    const logChannel = client.channels.cache.get('957691844437889134') 
    || client.channels.fetch('957691844437889134');

    let prefix = config.prefix

    let category = await client.commands
        .map(x => x.category)
    let embed = new MessageEmbed()
    .setAuthor({name: "testbot", iconURL: 'https://cdn.discordapp.com/attachments/949307937610956822/957673185212518500/1648397471502.jpg'})
    .setThumbnail('https://cdn.discordapp.com/attachments/949307937610956822/957673185212518500/1648397471502.jpg')
    .addFields({ name: '\u200b', value: '\u200b' })
    .setColor("#ff2474")
    .setFooter({text:`Используйте ${prefix}help <command> что бы узнать о команде больше!` })
      
    let commList = []
    for (let i = 0; i < category.length; i++) {
      if (!commList.includes(category[i])){
        commList.push(category[i])
        let cmdList = await client.commands
            .filter(x => x.category === category[i])
            .map(x => x.name)
            .join(", ")
        embed.addField(`Команды бота: `,`\`\`\`${cmdList}\`\`\``)
      }
    }
    return logChannel.send({embeds: [embed]})
  }