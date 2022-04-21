module.exports = {
    name: "ban",
    description: "бан пользователя",
    use: "ban <@user>",
    userPermissions: ["BAN_MEMBERS"],
    category: "Модерация",
    aliases: [],
    options: [
        {
            name: "target",
            description: "target to ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason to ban",
            type: "STRING",
            required: false
        }
    ],

    async execute(interaction) {
        const target = interaction.options.getMember("target");
        const member = interaction.guild.members.cache.get(user.id)
            || await interaction.guild.members.fetch(user.id).catch(err => { })
        const reason = interaction.options.getString("reason") || "No reason provided";

        if (!member.kickable || member.user.id === member.user.id)
            await interaction.reply({ content: "😡 | I am unable to kick this member" })

        if (interaction.member.roles.highest.position <= member.roles.highest.position)
            await interaction.reply({ content: 'Нельзя кикнуть пользователя с ролью выше вашей' })
        await target.send(
            `Тебя забанили на сервере ${interaction.guild.name}, причина: ${reason}`
        );
        target.ban({ reason })

        interaction.reply({
            content: `Пользователя ${target.user.tag} забанили, причина: ${reason}`
        })
    },
    admin: false
}
module.exports.interaction = {
    name: "ban",
    description: "бан пользователя",
    use: "ban <@user>",
    userPermissions: ["BAN_MEMBERS"],
    category: "Модерация",
    options: [
        {
            name: "target",
            description: "target to ban",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "reason to ban",
            type: "STRING",
            required: false
        }
    ]
}