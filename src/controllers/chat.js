const chat = require('../repositories/chat');
const chatService = require('../services/chat')

class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }

    getChats = async (req, res) => {
        try {
            const { offset, limit, firstParticipant, secondParticipant } = req.query
            if (firstParticipant && secondParticipant) {
                const chat = await this.chatService.getСhat(firstParticipant, secondParticipant)
                return res.status(200).json(chat)
            }
            const chats = await this.chatService.getChats(offset, limit)
            res.status(200).json(chats)
        } catch (error) {
            console.log(error);
            res.status(500).send('something went wrong')
        }
    }

    createChat = async (req, res) => {
        try {
            const { firstParticipant, secondParticipant } = req.body;
            const chat = await this.chatService.createChat(firstParticipant, secondParticipant)
            res.status(201).json(chat)
        } catch (error) {
            console.log(error);
            if (error.message) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).send('something went wrong')
        }
    }
}

module.exports = new ChatController(chatService)