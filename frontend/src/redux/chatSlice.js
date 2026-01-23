import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from '../lib/axios'
export const getAllContacts = createAsyncThunk("/message/getAllContacts", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/message/getAllContacts");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Auth check failed");
  }
});
export const getMyChatPartners = createAsyncThunk("/message/getChatPartners", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/message/getChatPartners");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Auth check failed");
  }
});

export const getMessagesByUserId = createAsyncThunk("/message/:id", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/message/${data}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Auth check failed");
  }
});
const chatSlice = createSlice({
  name: 'chat',
  initialState:{
    messages:[],
    contacts:[],
    chats:[],
    isSoundEnabled:JSON.parse(localStorage.getItem("soundEnabled"))===true,
    selectedUser:null,
    isMessagesLoading:false,
    isContactsLoading:false,
    activeTab:"chat"

  },
  reducers: {
    toggleSound(state) {

      localStorage.setItem("soundEnabled",!state.isSoundEnabled)
      state.isSoundEnabled=!state.isSoundEnabled
    },
    setActiveTab(state,action) {
      state.activeTab=action.payload
    },
    setSelectedUser(state,action) {
      state.selectedUser=action.payload
    },

  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllContacts.pending, (state) => {
      state.isContactsLoading = true;
    })
    .addCase(getAllContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.isContactsLoading = false;
    })
    .addCase(getAllContacts.rejected, (state, action) => {
      state.isContactsLoading = false;
      console.log("Get All Contacts Error:", action.payload); // Logged here
    })

    //my chats
    .addCase(getMyChatPartners.pending, (state) => {
      state.isContactsLoading = true;
    })
    .addCase(getMyChatPartners.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.isContactsLoading = false;
    })
    .addCase(getMyChatPartners.rejected, (state, action) => {
      state.isContactsLoading = false;
      console.log("Get My Contacts Error:", action.payload); // Logged here
    })

    .addCase(getMessagesByUserId.pending, (state) => {
      state.isMessagesLoading = true;
    })
    .addCase(getMessagesByUserId.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.isMessagesLoading = false;
    })
    .addCase(getMessagesByUserId.rejected, (state, action) => {
      state.isMessagesLoading = false;
      console.log("Get messages Error:", action.payload); // Logged here
    })
  }
})

export const { toggleSound, setActiveTab, setSelectedUser } = chatSlice.actions;

export default chatSlice.reducer;
