const usersDB = require('./userShm');
const membersDB = require('./memberShm')
const guildsDB = require('./guildShm')

module.exports.getUserDB = async (userID) => {
    let userDB = await usersDB.findOne({ id: userID })
    if(userDB) return userDB
    else{
        userDB = new usersDB({
            id: userID
          })
          await userDB.save().catch(err => console.log(err))
          return userDB
        }
    }

module.exports.getMemberDB = async (guildID, userID) => {
    let memberDB = await membersDB.findOne({
        id: userID,
        guild: guildID
    })
    if(memberDB) return memberDB
    else{
        membersDB = new membersDB({
            id : userID,
            guild: guildID
        })
        await memberDB.save().catch(err => console.log(err))
        return memberDB
    }
}

module.exports.getGuildDB = async (guildID) => {
    let guildDB = await guildsDB.findOne({
        guild: guildID
    })
    if (guildDB) return guildDB
    else{
        guildDB = new guildsDB({
            guild: guildID
        })
        await guildDB.save().catch(err => console.log(err))
        return guildDB
    }
}