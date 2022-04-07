const config = require('../../config.json');


module.exports = async (client, message) => {
   
    let guildDB = await client.data.getGuildDB(message.guild.id)

    let prefix = !guildDB.prefix ? config.prefix : guildDB.prefix

    let userDB = client.data.getUserDB(message.author.id);
    let data = {}
    data.config = config
    data.guild = guildDB
    data.user = userDB
    
    

    if (message.author.bot) return

    if(!message.content.toLowerCase().startsWith(prefix)) {
        if (message.content === `<@!${message.client.user.id}>` || message.content === `<@${message.client.user.id}>`) {
            return message.reply("Для вызова команд нужно использовать" + prefix)
        }
        return
    }


    
 const args = message.content.slice(prefix.length).trim().split(/ +/g);
 const commandName = args.shift().toLowerCase();
 const command_file = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    data.command_file = command_file;  
    if (!command_file) return
    if (command_file) command_file.execute(client, message, args, data, prefix);
    
}