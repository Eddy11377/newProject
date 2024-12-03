const chatRepository = require('../repositories/chat')

class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository
    }

    async getChats(offset, limit, first_participant, second_participant,  ) {
        try {
            if (first_participant && second_participant) {
                return await this.chatRepository.getChat(first_participant, second_participant)
            }
            return await this.chatRepository.getChats(offset, limit)
        } catch (error) {
            throw new Error('не удалось получить чаты')
        }
    }

    async createChat(first_participant, second_participant) {
        try {
            return await this.chatRepository.createChat(first_participant, second_participant)
        } catch (error) {
            throw new Error('не удалось создать чат')
        }
    }
}

module.exports = new ChatService(chatRepository)