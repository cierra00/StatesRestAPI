const statesData = require('../model/statesData.json');

const validateState = () => {
    return (req, res, next) => {     
        const providedStateAbbr = req.params.state.toUpperCase();
        const stateAbbreviations = statesData.map(state => state.code);
        const confirmState = stateAbbreviations.find(code => code === providedStateAbbr);
        if (!confirmState) {
            return res.status(400).json({ 'message': 'Invalid state abbreviation parameter' });
        }
        req.code = providedStateAbbr;
        next();
    };
};

module.exports = validateState;