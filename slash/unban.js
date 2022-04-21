module.exports = {
    name: "unban",
    description: "разбан пользователя",
    use: "unban <@user>",
    userPermissions: ["BAN_MEMBERS"],
    category: "Модерация",
    aliases: [],
    options: [
        {
            name: "userid",
            description: "Пользователь которого вы хотите разбанить",
            type: "STRING",
            required: true
        }
    ],

    async execute(client, interaction, args, argsF, data) {
        const userId = interaction.options.GetString(user)

        interaction.guild.member.unban(userId)
            .then((user) => {
                interaction.reply({
                    content: `${user.tag} разбанен на этом сервере`
                })
            }).catch(() => {
                interaction.reply({
                    content: `Пожалуйста проверьте id пользователя которого хотите разбанить`
                })
            })
    },
    admin: false
}
module.exports.interaction = {
    name: "unban",
    description: "разбан пользователя",
    use: "unban <@user>",
    userPermissions: ["BAN_MEMBERS"],
    category: "Модерация",
    options: [
        {
            name: "userid",
            description: "Пользователь которого вы хотите разбанить",
            type: "STRING",
            required: true
        }
    ]
}