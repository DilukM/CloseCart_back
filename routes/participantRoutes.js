const express = require('express');
const router = express.Router();
const { createParticipant } = require('../controllers/participantController');
const { validateParticipantData } = require('../middleware/validationMiddleware');

router.post('/register', validateParticipantData, createParticipant);

module.exports = router;