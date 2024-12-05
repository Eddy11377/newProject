const chatModel = require('../db/models/chat');

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
                firstParticipant,
                secondParticipant
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