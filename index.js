const DiscordJS = require("discord.js"), fs = require("fs"), mongoose = require("mongoose")

global.cfg = require(`./config`)
global.client = new DiscordJS.Client({
    partials: ['MESSAGE', 'CHANNEL', 'USER', `GUILD_MEMBER`, 'REACTION'],
    intents: 32767,
    allowedMentions: {
        parse: [`users`, `roles`],
        repliedUser: true
    }
})
client.commands = new DiscordJS.Collection()
global.GuildModel = require(`./db/guildShm`)
global.MemberModel = require(`./db/memberShm`)
client.db = require('./db/db')

mongoose.connect(cfg.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { console.log(`Соединение с базой данных установлено!`) }).catch((err) => { console.log(err) })

fs.readdir(`./commands`, (err, ff) => {
    ff.filter(f => fs.lstatSync(`./commands/${f}`).isDirectory()).forEach(dir => {
        fs.readdir(`./commands/${dir}`, (e, files) => {
            if (e) throw e
            if (files && files.length > 0) {
                files.filter(g => g.endsWith(".js") && fs.lstatSync(`./commands/${dir}/${g}`).isFile()).forEach(file => {
                    let props = require(`./commands/${dir}/${file}`)
                    client.commands.set(file.split(".")[0], props)
                })
            }
        })
    })
})

const SlashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
for (const file of SlashFiles) {
    const commandAny = require(`./slash/${file}`);
    client.commands.any.push(commandAny);
}

fs.readdir(`./events`, (err, files) => {
    files.forEach(file => {
        const event = require(`./events/${file}`)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }
    })
})

process.on('unhandledRejection', (reason) => { console.log(reason) })

client.login(cfg.token)