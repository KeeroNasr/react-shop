import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import shopReducer from './shopSlice';

export const store = configureStore({
  reducer: shopReducer,
  middleware: [thunk],

})


export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
