import { createSlice } from "@reduxjs/toolkit";
import { IConnectionState } from "../../assets/Interface.ts";

const initialState: IConnectionState = {
    jwtToken: localStorage.getItem('jwtToken'),
    userInfo: null,
    currentState: 0,
    currentStateInfo: null,
    usdtBalance: 0,
    homeTabActive: 1,
}

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setJwtToken(state, action) {
            localStorage.setItem('jwtToken', action.payload);
            state.jwtToken = action.payload;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        setCurrentState(state, action) {
            state.currentState = action.payload;
        },
        setCurrentStateInfo(state, action) {
            state.currentStateInfo = action.payload;
        },
        setUsdtBalance(state, action) {
            state.usdtBalance = action.payload;
        },
        setHomeTabActive(state, action) {
            state.homeTabActive = action.payload;
        },
        logout(state) {
            localStorage.removeItem('jwtToken');
            state.jwtToken = null;
            state.userInfo = null;
            state.usdtBalance = 0
        }
    }
})
const { actions, reducer } = connectionSlice;
export const {
    setJwtToken,
    setUserInfo,
    setCurrentState,
    setCurrentStateInfo,
    setUsdtBalance,
    setHomeTabActive,
    logout,
} = actions;
export default reducer;
