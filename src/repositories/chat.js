const chatModel = require('../db/models/chat');

class ChatRepository {
    constructor(chatModel) {
        this.chatModel = chatModel;
    }

    async getChats(offset = 0, limit = 10) {
        return await this.chatModel.findAll({
            limit: limit,
            offset: offset
        })
    }

    async getChat(first_participant, second_participant) {
        const { id } = await this.database.find(el => (String(el.first_participant) === String(first_participant) && String(el.second_participant) === String(second_participant)) || ((String(el.first_participant) === String(second_participant) && String(el.second_participant) === String(first_participant))))
        return { id: id }
    }

    async createChat(first_participant, second_participant) {
        const chat = await this.chatModel.create({
            firstParticipant: first_participant,
            secondParticipant: second_participant
        })
        return { id: chat.id }
    }
}

module.exports = new ChatRepository(chatModel);