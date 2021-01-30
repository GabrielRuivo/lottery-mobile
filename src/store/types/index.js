//State:
const INITIAL_STATE = {
    typesLotofacil: [],
    typesMegasena: [],
    typesQuina: [],
}

//Action Type:
export const Types = {
    SET_TYPES: 'SET_TYPES',
}

//Action Creators:
export const Creators = {
    setTypes: (lotofacil, megasena, quina) => ({
        type: 'SET_TYPES',
        lotofacil,
        megasena,
        quina
    })
}

//Reducer:
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case Types.SET_TYPES: 
            return {
                ...state, 
                typesLotofacil: action.lotofacil, 
                typesMegasena: action.megasena, 
                typesQuina: action.quina, 
            }

        default: 
            return state;
    }
}


