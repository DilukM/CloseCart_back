import ResearchParticipant from '../models/ResearchParticipant.js';

export async function createParticipant(req, res) {
  
  try {
    // Check if email already exists
    // const existingParticipant = await ResearchParticipant.findOne({ 
    //   $or: [
    //     { email: req.body.email }, 
    //     { mobileNumber: req.body.mobileNumber }
    //   ] 
      
    // });

    // if (existingParticipant) {
    //   let conflictField = existingParticipant.email === req.body.email ? 'Email' : 'Mobile number';
    //   return res.status(409).json({ 
    //     message: `${conflictField} already registered for research participation` 
    //   });
    // }

    // Create new participant
    const newParticipant = new ResearchParticipant(req.body);
    await newParticipant.save();

    res.status(201).json({
      message: 'Research participation registered successfully',
      participantId: newParticipant._id
    });
  } catch (error) {
    console.error('Participant Registration Error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors: error.errors 
      });
    }

    res.status(500).json({ 
      message: 'Server error during participant registration' 
    });
  }
}