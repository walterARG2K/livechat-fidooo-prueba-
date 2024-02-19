import { createSlice } from "@reduxjs/toolkit";

export interface ChatState {
  name: string;
  session: number | null;
  id: null | string;
  messages:
    | {
        text: string;
        timestamp: { seconds: number; nanoseconds: number };
        uid: string;
        name: string;
        photo: string;
      }[]
    | [];
}

const initialState: ChatState = {
  name: "",
  session: null,
  id: null,
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      const { messages, name, session, id } = action.payload;
      state.messages = messages;
      state.name = name;
      state.session = session;
      state.id = id;
    },
    removeChat: (state, action) => {
      (state.messages = []),
        (state.name = ""),
        (state.session = null),
        (state.id = null);
    },
  },
});

export const { setChat, removeChat } = chatSlice.actions;
