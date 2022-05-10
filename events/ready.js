const command = require("nodemon/lib/config/command")
const guildShm = require("../db/guildShm")

module.exports = {
    name: "ready",
    async execute(client) {
        try {
            client.user.setPresence({
                activities: [{
                    name: "!help",
                    type: 2
                }]
            })
            await console.log(`Бот ${client.user.tag} Запущен!!!`)
        } catch (err) {
            console.log(err)
        }
        const commandsIT = client.application.commands
        await commandsIT.fetch(); //Найти все команды

        for (const command of client.commands.any) {
            if (command.interaction) { //Если слэш команда есть
                const interaction = await commandsIT.cache.find(com => com.name == command.interaction.name); //Найти команду в боте по названию
                if (!interaction) commandsIT.create(command.interaction); //Создать команду
                else  //Если команда есть
                    if (JSON.stringify(interaction.options) !== JSON.stringify(command.interaction.options)) {//И параметры команды не совпадают (т.е. команда была изменена)
                        interaction.edit(command.interaction); //Редактируем эту команду
                    }
            }
        }
        // commandsIT.fetch() // id of your command
        //     .then((command) => {
        //         console.log(`Fetched command ${command.name}`)
        //         // further delete it like so:
        //         command.delete()
        //         console.log(`Deleted command ${command.name}`)
        //     })
    }
}