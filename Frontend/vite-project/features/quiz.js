import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk to fetch quizzes
export const fetchQuizzes = createAsyncThunk('quiz/fetchQuizzes', async () => {
  const response = await axios.get('http://localhost:8000/allquizes');
  return response.data;
});

export const fetchUserDatails= createAsyncThunk('fetchUserDatails',async()=>{
  const respons=await a
})

const initialState = {
  quizes: [],
  user: "",
  currentquiz:{},
  userdetails:{},
  status: 'idle',
  error: null
};
export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setUser:(state,action)=>{
        state.user=action.payload;
    },
    setUserDetails:(state,action)=>{
      state.userdetails=action.payload;
    },
    setcurrentquiz:(state,action)=>{
      state.currentquiz=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quizes = Array(action.payload);
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
export const {setUser,setUserDetails,setcurrentquiz} = quizSlice.actions
export default quizSlice.reducer;
