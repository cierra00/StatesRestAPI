const State = require('../model/State');
const  statesData = require('../model/statesData.json');


const getAllStates =  async (req, res) =>{   
    const { contig } = req?.query; 
    let allStates = [...statesData];

    if (contig === 'false') {
        allStates = allStates.filter(
            state => state.code === 'AK' || state.code === 'HI');
    } 
    if(contig === 'true') {  
        allStates = allStates.filter(state => 
            state.code !== 'AK' && state.code !== 'HI');
    }  

    const statesDB = await State.find();  

  allStates.map((state)=>{
       const matchState = statesDB.find(
        stateName=> stateName.stateCode===state.code);
       if(matchState){
        state.funfacts = [...matchState.funfacts];
       }
    });
   res.json(allStates);
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