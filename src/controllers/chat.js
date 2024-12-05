const chat = require('../repositories/chat');
const chatService = require('../services/chat')

class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }

    getChats = async (req, res) => {
        try {
            const { offset, limit, firstParticipant, secondParticipant } = req.query
            const result = await this.chatService.getChats(offset, limit, firstParticipant, secondParticipant)
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
            res.status(500).send('something went wrong')
        }
    }

    createChat = async (req, res) => {
        try {
            const { firstParticipant, secondParticipant } = req.body;
            const result = await this.chatService.createChat(firstParticipant, secondParticipant)
            res.status(201).json({id: result})
        } catch (error) {
            console.log(error);
            if (error.message) {
                return res.status(400).json({message: error.message})
            }
            res.status(500).send('something went wrong')
        }
    }
}

module.exports = new ChatController(chatService)