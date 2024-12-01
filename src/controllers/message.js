const messageService = require('../services/message');

class MessageController {
    constructor(messageService) {
        this.messageService = messageService
    }

    createMessage = async (req, res) => {
        try {
            const { text, author, chat_id } = req.body;
            const result = this.messageService.createMessage(text, author, chat_id)
            res.status(201).json(result)
        } catch (error) {
            if (error.message) {
                return res.status(400).json({message: error.message})
            }
            res.status(500).send('something went wrong')
        }
    }

    getMessages = async (req, res) => {
        try {
            const { chat_id, offset, limit } = req.query;
            const result = messageService.getMessages(chat_id, offset, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send('something went wrong');
        }
    }
}

module.exports = new MessageController(messageService)