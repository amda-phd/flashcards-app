import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Card, CardsState } from "../../interfaces/Card";

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer;
