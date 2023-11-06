import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicState {
  _id: string | null;
  name: string | null;
  level: "beginner" | "medium" | "advanced" | null;
}

const initialState: TopicState = {
  _id: null,
  name: null,
  level: null,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setSelectedTopic(state, action: PayloadAction<TopicState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSelectedTopic } = topicSlice.actions;
export default topicSlice.reducer;
