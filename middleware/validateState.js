const statesData = require('../model/statesData.json');

const validateState = () => {
    return (req, res, next) => {     
        const providedStateAbbr = req.params.data.toUpperCase();
        const stateAbbreviations = statesData.map(StateName => StateName.code);
        const confirmState = stateAbbreviations.find(code => code === providedStateAbbr);
        if (!confirmState) {
            return res.status(400).json({ 'message': 'Invalid state abbreviation parameter' });
        }
        req.code = providedStateAbbr;
        next();
    };
};

module.exports = validateState;