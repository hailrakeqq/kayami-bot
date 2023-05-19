const { MessageEmbed } = require("discord.js")
const { Permissions } = require('discord.js')
module.exports = {
    name: "clear",
    desc: "Команда для удаления сообщений",
    use: "clear [count]",
    category: ":shield: Модерация",
    userPermissions: "MANAGE_MESSAGES",
    aliases: [],

    async execute(message, client, args) {
        let count = Number.parseInt(args[0])
        if (!count || count > 100 || count <= 0) {
            count = 0;
            if (count > 100) message.channel.send('Нельзя удалить больше 100 сообщений за раз');
            if (count == 0) message.channel.send('Вы не указали, сколько сообщений нужно удалить');
        }
        message.channel
            .bulkDelete(count)
            .then(() => {
                message.channel.send(`Успешно удалено ${count} сообщений`)
                    .then(msg => { msg.delete({ timeout: 6000 }) })
            })
            .catch((err) => {
                message.channel.send('Ошибка удаления сообщений').
                    then(msg => { msg.delete({ timeout: 5000 }) })
            });
    },
    admin: false
};

