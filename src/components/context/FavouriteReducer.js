import { ADD_TO_FAVOURITE, REMOVE_FAVOURITE } from "./Types";

const FavouriteReducer = (state, action) => {
    switch(action.type){
        case ADD_TO_FAVOURITE: {
            return {
                ...state,
                favouriteItem: [...state.favouriteItem, action.payload]
            }
        }

        case REMOVE_FAVOURITE: {
        return{
            ...state,
            favouriteItem: state.favouriteItem.filter(item => item.id !== action.payload)
        }
        }

        default:
        return state
    }

}

export default FavouriteReducer;