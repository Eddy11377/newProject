const chatRepository = require('../repositories/chat')

class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository
    }

    async getChats(offset, limit, firstParticipant, secondParticipant,) {
        try {
            if (firstParticipant && secondParticipant) {
                const { id } = await this.chatRepository.getChat(firstParticipant, secondParticipant)
                return id
            }
            return await this.chatRepository.getChats(offset, limit)
        } catch (error) {
            throw new Error('не удалось получить чаты')
        }
    }

    async createChat(firstParticipant, secondParticipant) {
        try {
            const { id } = await this.chatRepository.createChat(firstParticipant, secondParticipant)
            return id
        } catch (error) {
            throw new Error('не удалось создать чат')
        }
    }
}

module.exports = new ChatService(chatRepository)