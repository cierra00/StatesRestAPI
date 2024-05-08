const express = require('express');
const router = express.Router();
const path = require('path');
const statesController  = require ('../../controllers/statesController');
const validateState = require('../../middleware/validateState');


router.route('/')
    .get(statesController.getAllStates)
    
    router.route('/:state')
    .get(validateState(), statesController.getState)

    router.route('/:state/funfact')
    .get(validateState(), statesController.getFunFact)
    .post(validateState(), statesController.createNewFunfacts)
    .patch(validateState(), statesController.updateState)
    .delete(validateState(), statesController.deleteState) 
    
    router.route('/:state/capital')
    .get(validateState(), statesController.getCapital)

    router.route('/:state/nickname')
    .get(validateState(), statesController.getNickname) 
    
    router.route('/:state/population')
    .get(validateState(), statesController.getPopulation)
    router.route('/:state/admission')
    .get(validateState(), statesController.getAdmission)    
   




module.exports = router;