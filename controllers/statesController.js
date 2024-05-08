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
    const dbState = await State.findOne({ stateCode: code }).exec();

    if (dbState) { 
        state.funfacts = [...dbState.funfacts]
    }
    return res.json(state)
}


const getFunFact = async(req, res) =>{
    const code = req.code;
    const data = statesData.find(stateName => stateName.code === code);
    const dbState = await State.findOne({ stateCode: code }).exec();

    if (dbState.funfacts?.length < 1) { 
        return res.status(404).json({ 
            'message': `No Fun Facts found for ${data.state}`
         });
    }
    const randomFunfact = dbState[Math.floor(Math.random()* dbState.funfacts.length)];
    return res.json({'funfact': randomFunfact})
}
const getCapital = async(req, res) =>{
    const code = req.code
}
const getNickname= async(req, res) =>{
    const code = req.code
}
const getPopulation = async(req, res) =>{
    const code = req.code
}
const getAdmission = async(req, res) =>{
    const code = req.code
}

const createNewFunfacts = async(req, res) =>{
    console.log(req);
}
const updateState = async(req, res) =>{
    const code = req.code
}
const deleteState = async(req, res) =>{
    const code = req.code

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