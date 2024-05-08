const State = require('../model/State');
const  statesData = require('../model/statesData.json');


const getAllStates =  async (req, res) =>{   
    const { contig } = req?.query; 
    let allStates = [...statesData];

    if (contig === 'false') {
        allStates = allStates.filter(
            stateName => stateName.code === 'AK' || stateName.code === 'HI');
    } 
    if(contig === 'true') {  
        allStates = allStates.filter(stateName => 
            stateName.code !== 'AK' && stateName.code !== 'HI');
    }  
    const statesDB = await State.find();  

  allStates.map((state)=>{
       const matchState = statesDB.find(
        stateName => stateName.stateCode===state.code);
       if(matchState){
        state.funfacts = [...matchState.funfacts];
       }
    });
   res.json(allStates);
}
const getState = async(req, res) =>{
    const code = req.code;
    const state = statesData.find(stateName => stateName.code === code);
    const statesDB = await State.findOne({ stateCode: code }).exec();

    if (statesDB) { 
        state.funfacts = [...statesDB.funfacts]
    }
    return res.json(state)
}


const getFunFact = async(req, res) =>{
    const code = req.code;
    const state = statesData.find(state => state.code === code);
    const statesDB = await State.findOne({ stateCode: code }).exec();

    if (!statesDB?.funfacts?.length) { 
        return res.status(404).json({ 
            'message': `No Fun Facts found for ${state.state}`
         });
    }
    const INDEX = Math.floor(Math.random() * statesDB.funfacts.length);
    const randomFunfact = statesDB.funfacts[INDEX];
    return res.json({'funfact': randomFunfact})
}
const getCapital = async(req, res) =>{
    const code = req.code;
    const state = statesData.find(state => state.code === code);
    res.json({ 'state': state.state, 'capital': state.capital_city })
}
const getNickname= async(req, res) =>{
    const code = req.code;
    const state = statesData.find(state => state.code === code);
    res.json({ 'state': state.state, 'nickname': state.nickname })
}
const getPopulation = async(req, res) =>{
    const code = req.code;
    const state = statesData.find(state => state.code === code);
    res.json({ 'state': state.state, 'population': state.population.toLocaleString('en-US') })
}
const getAdmission = async(req, res) =>{
    const code = req.code;
    const state = statesData.find(state => state.code === code);
    res.json({ 'state': state.state, 'admitted': state.admission_date })
}

const createNewFunfacts = async(req, res) =>{
    const code = req.code;
    const { funfacts } = req?.body; 

    if (!funfacts){
        return res.status(400).json({ 
            'message': 'State fun facts value required' 
        })
    }

    if (!Array.isArray(funfacts)){
        return res.status(400).json({ 
            'message': 'State fun facts value must be an array' 
        })
    }
    const statesDB = await State.findOne({ stateCode: code }).exec();

    let result;
    if (statesDB) { 
        statesDB.funfacts = [...statesDB.funfacts, ...funfacts]
        result = await statesDB.save();
        return res.json(result)
    } else { 
        try {
            result = await State.create({
                stateCode: code,
                funfacts
            })
            return res.status(201).json(result)
        } catch (err) {
            console.error(err)
        }
    }
}
const updateState = async(req, res) =>{
    const code = req.code;
    let { index, funfact } = req?.body;
    index -= 1;

    if (!index){
        return res.status(400).json({ 
            'message': 'State fun fact index value required' 
        })
    }
   if (!funfact){
        return res.status(400).json({ 'message': 'State fun fact value required' })
    }

    const state = statesData.find(state => state.code === code)

    const statesDB = await State.findOne({ stateCode: code }).exec();

    if (!statesDB?.funfacts?.length){
        return res.status(404).json({ 
            'message': `No Fun Facts found for ${state.state}` })
    }

    if (!statesDB.funfacts[index]){
        return res.status(404).json({ 
            'message': `No Fun Fact found at that index for ${state.state}` 
        })
    }
    statesDB.funfacts[index] = funfact;   
    const result = await statesDB.save();   
    res.json(result)
}
const deleteState = async(req, res) =>{
    const code = req.code;
    let { index } = req?.body;

    if (!index){
        return res.status(400).json({ 'message': 'State fun fact index value required' })
    }
    index -=1;
    const state = statesData.find(state => state.code === code);
    const statesDB = await State.findOne({ stateCode: code }).exec();

    if (!statesDB?.funfacts?.length){
        return res.status(404).json({ 
            'message': `No Fun Facts found for ${state.state}` 
        })
    }

    if (!statesDB.funfacts[index]) {
        return res.status(404).json({ 
            'message': `No Fun Fact found at that index for ${state.state}` 
        })
    }
  
    const filteredData = savedState.funfacts.filter((funfact, i) => i !== index);
    savedState.funfacts = filteredData;
    const result = await savedState.save(); 
    res.json(result)

}
module.exports = {
    getAllStates,
    getState,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    createNewFunfacts,
    updateState,
    deleteState
}