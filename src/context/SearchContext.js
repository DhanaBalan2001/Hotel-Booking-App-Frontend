import { createContext, useReducer } from "react";
import React from "react";

const SearchContext = createContext();

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
      adult: undefined,
      children: undefined,
      room: undefined,
    },
    selectedRooms: [],
    selectedHotel: null,
    redirectToPayment: false,
    selectedRoom: null,
    paymentCompleted: false,
};

const SearchReducer = (state, action) => {
    switch (action.type) {
      case "NEW_SEARCH":
        return action.payload;
      case "RESET_SEARCH":
        return INITIAL_STATE;
      case "SELECT_ROOMS":
        return { ...state, selectedRooms: action.payload };
      case "SELECT_HOTEL":
        return { ...state, selectedHotel: action.payload };
      case "REDIRECT_TO_PAYMENT":
        return { ...state, redirectToPayment: true };
      case "SELECT_ROOM":
        return { ...state, selectedRoom: action.payload };
      case "COMPLETE_PAYMENT":
        return { ...state, paymentCompleted: true };
      default:
        return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
      <SearchContext.Provider
        value={{
          city: state.city,
          dates: state.dates,
          options: state.options,
          selectedRooms: state.selectedRooms,
          selectedHotel: state.selectedHotel,
          redirectToPayment: state.redirectToPayment,
          selectedRoom: state.selectedRoom,
          paymentCompleted: state.paymentCompleted,
          dispatch,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
};

export { SearchContext };