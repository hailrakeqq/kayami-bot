const membersDB = require('./memberShm')
const guildsDB = require('./guildShm')

module.exports.getMember = async (member) => {
    let memberDB = await membersDB.findOne({ id: member.id })
    if (memberDB) return memberDB
    else {
        await membersDB.create({ id: member.id, guild: member.guild.id })
        return await membersDB.findOne({ id: member.id })
    }
}

module.exports.getGuild = async (guild) => {
    let guildDB = await guildsDB.findOne({ guild: guild.id })
    if (guildDB) return guildDB
    else {
        await guildsDB.create({ guild: guild.id })
        return await guildsDB.findOne({ guild: guild.id })
    }
}