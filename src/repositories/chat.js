const chatModel = require('../db/models/chat');
const { Op } = require('../db/index')

class ChatRepository {
    constructor(chatModel) {
        this.chatModel = chatModel;
    }

    async getChats(offset = 0, limit = 10) {
        return this.chatModel.findAll({
            limit,
            offset
        })
    }

    async getChat(firstParticipant, secondParticipant) {
        return this.chatModel.findOne({
            where: {
                [Op.or]: [{
                    firstParticipant,
                    secondParticipant
                }, { firstParticipant: secondParticipant, secondParticipant: firstParticipant }]
            }
        })
    }

    async createChat(firstParticipant, secondParticipant) {
        return this.chatModel.create({
            firstParticipant,
            secondParticipant
        })
    }
}

module.exports = new ChatRepository(chatModel);