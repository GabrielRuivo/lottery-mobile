//State
const INITIAL_STATE = {
    cartLotofacil: [],
    cartMegasena:  [],
    cartQuina: [],
    savesLotofacil: [],
    savesMegasena:  [],
    savesQuina: [],
    price: 0,
    update: 0,
}

//Actions Types: 
export const Types = {
    ADD_CART_LOTOFACIL: 'ADD_CART_LOTOFACIL',
    ADD_CART_MEGASENA: 'ADD_CART_MEGASENA',
    ADD_CART_QUINA: 'ADD_CART_QUINA',

    REMOVE_CART_LOTOFACIL: 'REMOVE_CART_LOTOFACIL',
    REMOVE_CART_MEGASENA: 'REMOVE_CART_MEGASENA',
    REMOVE_CART_QUINA: 'REMOVE_CART_QUINA',

    SET_PRICE_CART: 'SET_PRICE_CART',
    SAVE_GAMES: 'SAVE_GAMES',
    LOG_OUT: 'LOG_OUT'
}

//Actions Creators
export const Creators = {
	addToCartLotofacil: (payload, price) => ({ type: 'ADD_CART_LOTOFACIL', payload, price }),
    addToCartMegasena: (payload, price) => ({ type: 'ADD_CART_MEGASENA', payload ,price }),
    addToCartQuina: (payload, price) => ({ type: 'ADD_CART_QUINA', payload, price }),
    
    removeCartLotofacil: (payload, price) => ({ type: 'REMOVE_CART_LOTOFACIL', payload, price }),
    removeCartMegasena: (payload, price) => ({ type: 'REMOVE_CART_MEGASENA', payload, price }),
    removeCartQuina: (payload, price) => ({ type: 'REMOVE_CART_QUINA', payload, price }),

    setPriceCart: (payload, price) => ({ type: 'SET_PRICE_CART', payload, price }),
    saveGames: (price) => ({ type: 'SAVE_GAMES', price }),
    logout: () => ({ type: 'LOG_OUT' }),
}

//Reducer:
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case Types.ADD_CART_LOTOFACIL: 
            return {...state, cartLotofacil: [...state.cartLotofacil, action.payload], price: state.price + 2.50 }

        case Types.ADD_CART_MEGASENA: 
            return {...state, cartMegasena: [...state.cartMegasena,  action.payload], price: state.price + 4.50 }

        case Types.ADD_CART_QUINA: 
            return {...state, cartQuina: [...state.cartQuina, action.payload], price: state.price + 2.00 }
        
        case Types.REMOVE_CART_LOTOFACIL: 
            return {...state, cartLotofacil: action.payload, price: state.price - action.price }

        case Types.REMOVE_CART_MEGASENA: 
            return {...state, cartMegasena: action.payload, price: state.price - action.price }

        case Types.REMOVE_CART_QUINA: 
            return {...state, cartQuina: action.payload, price: state.price - action.price }
        
        case Types.SET_PRICE_CART: 
            return { price: state.price - action.payload}

        case Types.SAVE_GAMES: 
            return {...state, cartLotofacil:[], cartMegasena:[], cartQuina:[], price: 0, update: state.update + 1 }
        
        case Types.LOG_OUT: 
            return { cartLotofacil:[], cartMegasena:[], cartQuina:[], savesLotofacil:[], savesMegasena:[], savesQuina:[], price: 0} 

        default: 
            return state;
    }
}

