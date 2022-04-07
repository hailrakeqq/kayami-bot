const {Client, Collection} = require('discord.js')
const fs = require('fs')
const mongoose = require('mongoose');
const ready = require('./app/events/ready');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const config = require('./config.json')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
client.commands = new Collection(); 
client.events = new Collection();
client.data = require('./app/db/db')


const commandFiles = fs.readdirSync('./app/commands/').filter(f => f.endsWith('.js'))
    for (const f of commandFiles) {
        const command = require(`./app/commands/${f}`)
        client.commands.set(command.name, command)
    }

const eventFiles = fs.readdirSync('./app/events/').filter(f => f.endsWith('.js'))
    for (const f of eventFiles) {
        const event = require(`./app/events/${f}`)
        const eventS = f.split(".")[0]
        client.on(eventS, event.bind(null, client))
    }

mongoose.connect(config.mongoDB).then(async () => {
    await console.log("База данных mongodb подключена");
}).catch(async () => {
    await console.log("нету подключения к mongodb")
})

client.login(config.token).then(async () => {
    await console.log('Команды и ивенты успешно загрузились', ready)
}).catch(async (err) => {
    await console.log(`Нету команд для заргрузки: ${err}`);
})

