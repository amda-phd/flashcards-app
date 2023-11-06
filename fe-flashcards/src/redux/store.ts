import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./slices/topicSlice";
import cardsReducer from "./slices/cardsSlice";

const store = configureStore({
  reducer: {
    topic: topicReducer,
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
