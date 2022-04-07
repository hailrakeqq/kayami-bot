const Discord = module.require("discord.js");
const { GuildMember, Guild } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "clear",
    desc: "Команда для удаления сообщений",
    use: "clear [count]",
async execute (client,message,args,data) {
    let count = Number.parseInt(args[0]);
    let roleA = '959790723400601600';
    if (message.member.roles.cache.has(roleA)){
        if (!count || count > 100 || count <= 0){ 
            count = 0;
            if(count > 100) message.channel.send('Нельзя удалить больше 100 сообщений за раз');
            if(count == 0) message.channel.send('Вы не указали, сколько сообщений нужно удалить');
        }
        message.channel
            .bulkDelete(count)
            .then(() => {
                message.channel.send(`Успешно удалено ${count} сообщений`)
                .then(msg => {
                    msg.delete({ timeout: 6000 })
                })
            })
            .catch((err) => {
                message.channel.send('Ошибка удаления сообщений').
                then(msg => {
                    msg.delete({timeout: 5000})
                })
               
            });
        } else {
            message.channel.send('У вас нет прав для использования этой команды')
        }       
}


};

