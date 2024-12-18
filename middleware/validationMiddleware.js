const validateParticipantData = (req, res, next) => {
  const { 
    firstName, 
    lastName, 
    email, 
    age, 
    gender, 
    location, 
    shoppingFrequency, 
    preferredCategories, 
    averageMonthlySpending,
    communicationPreference,
    termsConsent 
  } = req.body;

  const errors = {};

  // Validation logic
  if (!firstName || firstName.trim() === '') errors.firstName = 'First name is required';
  if (!lastName || lastName.trim() === '') errors.lastName = 'Last name is required';
  
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email)) errors.email = 'Valid email is required';
  
  if (!age) errors.age = 'Age group is required';
  if (!gender) errors.gender = 'Gender is required';
  if (!location || location.trim() === '') errors.location = 'Location is required';
  
  if (!shoppingFrequency) errors.shoppingFrequency = 'Shopping frequency is required';
  if (!preferredCategories || preferredCategories.length === 0) 
    errors.preferredCategories = 'At least one category must be selected';
  
  if (!averageMonthlySpending) errors.averageMonthlySpending = 'Average spending is required';
  if (!communicationPreference) errors.communicationPreference = 'Communication preference is required';
  
  if (!termsConsent) errors.termsConsent = 'Consent is required';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ 
      message: 'Validation Failed', 
      errors 
    });
  }

  next();
};

module.exports = { validateParticipantData };
