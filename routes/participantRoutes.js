const express = require('express');
const router = express.Router();
const { createParticipant } = require('../controllers/participantController');
const { validateParticipantData } = require('../middleware/validationMiddleware');

router.post('/register', validateParticipantData, createParticipant);
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Research API' });
});

module.exports = router;