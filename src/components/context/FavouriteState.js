import { useReducer } from "react";
import FavoriteContext from "./FavouriteContext";
import FavouriteReducer from "./FavouriteReducer";
import {
  ADD_TO_FAVOURITE,
  REMOVE_FAVOURITE,
} from "./Types";

const FavouriteState = ({ children }) => {
  const initialState = {
    favouriteItem: [],
  };

  const [state, dispatch] = useReducer(FavouriteReducer, initialState);

  const addToFavourite = (vacation) => {
    dispatch({ type: ADD_TO_FAVOURITE , payload: vacation});
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_FAVOURITE, payload: id });
  };

  return (
    <FavoriteContext.Provider
      value={{
        showFavourite: state.showFavourite,
        favouriteItem: state.favouriteItem,
        addToFavourite,
        removeItem,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavouriteState;
