import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
    logout,
    setCurrentState,
    setCurrentStateInfo,
    setHomeTabActive,
    setJwtToken,
    setUsdtBalance,
    setUserInfo
} from "./reducer.ts";

export const useConnection = () => {
    const connection = useSelector((state: any) => state.connection);
    const dispatch = useDispatch();

    const onSetJwtToken = useCallback((jwtToken: string | null) => {
        dispatch(setJwtToken(jwtToken));
    }, [dispatch]);

    const onSetUserInfo = useCallback((userInfo: any | null) => {
        dispatch(setUserInfo(userInfo));
    }, [dispatch]);

    const onSetCurrentState = useCallback((state: number) => {
        dispatch(setCurrentState(state))
    }, [dispatch])

    const onSetCurrentStateInfo = useCallback((info: any) => {
        dispatch(setCurrentStateInfo(info))
    }, [dispatch])

    const onSetUsdtBalance = useCallback((balance: number) => {
        dispatch(setUsdtBalance(balance));
    }, [dispatch])

    const onSetHomeTabActive = useCallback((tab: number) => {
        dispatch(setHomeTabActive(tab))
    }, [dispatch])

    const onLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    return {
        connection,
        onSetJwtToken,
        onSetUserInfo,
        onSetCurrentState,
        onSetCurrentStateInfo,
        onSetUsdtBalance,
        onSetHomeTabActive,
        onLogout,
    }
}
