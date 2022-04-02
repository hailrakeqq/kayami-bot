const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client,message,args,prefix) => {
    let count = Number.parseInt(args[0]);
        if (!count || count > 100 || count <= 0) count = 0;
        message.channel
            .bulkDelete(count)
            .then(() => {
                message.channel.send(`Успешно удалено ${count} сообщений`);
            })
            .catch((err) => {
                message.channel.send('Ошибка удаления сообщений');
                if(count > 100) message.channel.send('Нельзя удалить больше 100 сообщений за раз');
                if(count == 0) message.channel.send('Вы не указали, сколько сообщений нужно удалить');
            });
            
};

module.exports.help = {
    name: "clear" 
};

// добавить удаление сообщения об удалении...