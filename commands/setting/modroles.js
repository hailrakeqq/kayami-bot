const { MessageEmbed } = require("discord.js");
const GuildModel = require("../../db/guildShm")

module.exports = {
    name: "modroles",
    desc: "Команда для добавления или удаления роли модерации",
    use: "modroles add/remove <role> - для того что бы добавить/удалить модеративную роль.\nmoderoles - для вывода модерационных ролей",
    userPermissions: ["MANAGE_ROLES"],
    aliases: [],
    category: ":gear: Основные",

    async execute(message, client, args) {
        let prefix = (await GuildModel.findOne({ id: message.guild.id })).prefix
        const { guild, channel } = message

        if (args[0] == 'add' || args[0] == 'remove') {
            let role = guild.roles.cache.get(args[1]?.replace(/[\\<>@#&!]/g, ``))
            if (!role) return message.reply('Вы не указали корректную роль!');
            let rolecheck = await GuildModel.findOne({ modRoles: role.id }) || null

            if (args[0] == 'add') {
                if (rolecheck) return message.reply(`Роль \`${role.name}\` уже есть в списке ролей модерации`)
                await GuildModel.updateOne({ id: guild.id }, { $push: { modRoles: role.id } });
            } else if (args[0] == 'remove') {
                if (!rolecheck) return message.reply('Этой роли нету в списке ролей модерации')
                await GuildModel.updateOne({ id: guild.id }, { $pull: { modRoles: role.id } })
            }
            channel.send(`Роль \`${role.name}\` успешно ${args[0] == `add` ? `установлена в качестве роли` : `удалена из списка ролей`} модерации`)
        } else {
            const roles = (await GuildModel.findOne({ id: guild.id })).modRoles.map(r => `<@&${r}>`).join(`\n`)

            if (roles == []) {
                const embedF = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor({ name: "Kayami", iconURL: client.user.displayAvatarURL() })
                    .addFields({ name: `Модеративных ролей нету, что бы добавить их используйте: `, value: `${prefix}modroles add/remove <role> - для того что бы добавить/удалить модеративную роль.` });
                message.channel.send({ embeds: [embedF] })
            }
            else {
                const embedSS = new MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor({ name: "Kayami", iconURL: client.user.displayAvatarURL() })
                    .addFields({ name: `Модеративные роли: `, value: `${roles}` });
                message.channel.send({ embeds: [embedSS] })
            }
        }
    },
    admin: true
}