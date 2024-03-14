const { Router } = require('express');

const { createMessages, getAllMessages } = require('../controller/message.ctrl');

const { auth } = require('../middleware/auth')

const router = Router()

router.get('/api/messages', getAllMessages)
router.post('/api/messages', auth, createMessages)

module.exports = router

