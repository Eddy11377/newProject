const chatRepository = require('../repositories/chat')

class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository
    }

    getChats(offset, limit, first_participant, second_participant,  ) {
        try {
            if ((first_participant && second_participant) || (second_participant && first_participant)) {
                return this.chatRepository.getChat(first_participant, second_participant)
            }
            return this.chatRepository.getChats(offset, limit)
        } catch (error) {
            throw new Error('не удалось получить чаты')
        }
    }

    createChat(first_participant, second_participant) {
        try {
            return this.chatRepository.createChat(first_participant, second_participant)
        } catch (error) {
            throw new Error('не удалось создать чат')
        }
    }
}

module.exports = new ChatService(chatRepository)