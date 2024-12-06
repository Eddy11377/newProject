const chatRepository = require('../repositories/chat')

class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository
    }

    async getChats(offset, limit) {
        try {
            const chats = await this.chatRepository.getChats(offset, limit)
            return chats
        } catch (error) {
            throw new Error('не удалось получить чаты')
        }
    }

    async getchat(firstParticipant, secondParticipant) {
        try {
            const chat = await this.chatRepository.getChat(firstParticipant, secondParticipant)
            return chat
        } catch (error) {
            throw new Error('Не удалось получить чат')
        }
    }

    async createChat(firstParticipant, secondParticipant) {
        try {
            const chat = await this.chatRepository.createChat(firstParticipant, secondParticipant)
            return chat
        } catch (error) {
            throw new Error('не удалось создать чат')
        }
    }
}

module.exports = new ChatService(chatRepository)