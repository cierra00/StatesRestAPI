const State = require('../model/State');
const  statesData = require('../model/statesData.json');


const getAllStates =  async (req, res) =>{   
    const { contig } = req?.query; 
    let allStates = [...statesData];

    if (contig === 'false') {
        allStates = allStates.filter(
            state => stateName.code === 'AK' || stateName.code === 'HI');
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
    const data = statesData.find(stateName => stateName.code === code);
    const dbState = await State.findOne({ stateCode: code }).exec();

    if (dbState) { 
        data.funfacts = [...dbState.funfacts]
    }
    return res.json(data)
}


const getFunFact = async(req, res) =>{
    console.log(req);
}
const getCapital = async(req, res) =>{
    console.log(req);
}
const getNickname= async(req, res) =>{
    console.log(req);
}
const getPopulation = async(req, res) =>{
    console.log(req);
}
const getAdmission = async(req, res) =>{
    console.log(req);
}

const createNewFunfacts = async(req, res) =>{
    console.log(req);
}
const updateState = async(req, res) =>{
    console.log(req);
}
const deleteState = async(req, res) =>{
    console.log(req);
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