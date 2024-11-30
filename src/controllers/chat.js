const chat = require('../repositories/chat');
const chatService = require('../services/chat')

class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }

    getChats = async (req, res) => {
        try {
            const { offset, limit, first_participant, second_participant } = req.query
            const result = this.chatService.getChats(offset, limit, first_participant, second_participant)
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
            res.status(500).send('something went wrong')
        }
    }

    createChat = async (req, res) => {
        try {
            const { first_participant, second_participant } = req.body;
            const result = this.chatService.createChat(first_participant, second_participant)
            res.status(201).json(result)
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