require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const config = require('./config.json')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
client.commands = new Discord.Collection() 

fs.readdir('./commands', (err, files) => { // чтение файлов в папке commands
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js') // файлы не имеющие расширение .js игнорируются
    if (jsfile.length <= 0) return console.log('Команды не найдены!') // если нет ни одного файла с расширением .js

    console.log(`Загружено ${jsfile.length} команд`)
    jsfile.forEach((f, i) => { // добавляем каждый файл в коллекцию команд
        let props = require(`./commands/${f}`)
        client.commands.set(props.help.name, props)
    })
})

client.on('ready', () => {
    console.log(`Бот ${client.user.username} запустился`);
})

client.on('message', message => {
    let prefix = config.prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let messageArray = message.content.split(' ') // разделение пробелами
    let command = messageArray[0] // команда после префикса
    let args = messageArray.slice(1) // аргументы после команды

    let command_file = client.commands.get(command.slice(prefix.length)) // получение команды из коллекции
    if (command_file) command_file.run(client, message, args, prefix)
})
client.login(process.env.TOKEN);