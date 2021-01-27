import { createStore } from 'redux';

const INITIAL_STATE = {
    cartLotofacil: [],
    cartMegasena:  [],
    cartQuina: [],

    price: 0,

    savesLotofacil: [],
    savesMegasena:  [],
    savesQuina: [],

    typesLotofacil: [],
    typesMegasena: [],
    typesQuina: [],

    user: null,

    update: 0,
}

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case 'SET_TYPES': 
            return {
                ...state, 
                typesLotofacil: action.lotofacil, 
                typesMegasena: action.megasena, 
                typesQuina: action.quina, 
            }

        case 'SET_USER': 
            return { ...state, user: action.payload }

        case 'LOG_OUT': 
            return { 
                user: null, 

                cartLotofacil: [],
                cartMegasena:  [],
                cartQuina: [],

                savesLotofacil: [],
                savesMegasena:  [],
                savesQuina: [],

                typesLotofacil: [],
                typesMegasena: [],
                typesQuina: [],

                price: 0,
            } 

        case 'ADD_CART_LOTOFACIL': 
            return {...state, cartLotofacil: [...state.cartLotofacil, action.payload], price: state.price + 2.50 }
        case 'ADD_CART_MEGASENA': 
            return {...state, cartMegasena:  [...state.cartMegasena,  action.payload], price: state.price + 4.50 }
        case 'ADD_CART_QUINA': 
            return {...state, cartQuina: [...state.cartQuina, action.payload], price: state.price + 2.00 }

        case 'REMOVE_CART_LOTOFACIL': 
            return {...state, cartLotofacil: action.newData, price: state.price - action.price }
        case 'REMOVE_CART_MEGASENA': 
            return {...state, cartMegasena:  action.newData, price: state.price - action.price }
        case 'REMOVE_CART_QUINA': 
            return {...state, cartQuina: action.newData, price: state.price - action.price }

        case 'SAVE_GAMES': 
            return { 
                ...state, 
                /* savesLotofacil: [...state.savesLotofacil, action.cartLotofacil],
                savesMegasena:  [...state.savesMegasena, action.cartMegasena ],
                savesQuina: [...state.savesQuina, action.cartQuina], */

                cartLotofacil: [],
                cartMegasena:  [],
                cartQuina: [],

                price: 0,
                update: state.update + 1,
            }

        case 'SET_PRICE_CART': 
            return { price: state.price - action.payload}

        default: 
            return state;
    }
}

const store = createStore(reducer)

export default store;