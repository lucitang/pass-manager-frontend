import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  result: string | null,
  email: string | null,
  authKey: number[] |null,
  vaultKey: number[]| null,
}
const initialState: AuthState = {    
    result: null,
    email: null,
    authKey: null,
    vaultKey: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUserData(state, action: PayloadAction<any>) {
        const value = action.payload;
        state.result = value.result;
        state.email = value.email;
        state.authKey = value.authKeyuint8;
        state.vaultKey = value.vaultKeyuint8;
      }
    },
  });

export const {setUserData} = authSlice.actions;
export const authReducer = authSlice.reducer;