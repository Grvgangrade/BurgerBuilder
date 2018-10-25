import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
        salad: 0.3,
        cheese: 0.5,
        meat: 1.3,
        bacon: 0.7
    }

const initialState = {
    ingredient: {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:4
};

const reducer = (state = initialState , action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT : 
            return {
                ...state,
                ingredient : {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        
        case actionTypes.REMOVE_INGREDIENT : 
            return {
                ...state,
                ingredient : {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
            
        default :
            return state;
    }
    
};

export default reducer;