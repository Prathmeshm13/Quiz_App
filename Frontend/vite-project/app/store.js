import {configureStore} from '@reduxjs/toolkit';
import quizReducer from '../features/quiz';

export const store = configureStore({
    reducer: quizReducer
})