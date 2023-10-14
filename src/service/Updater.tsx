import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import {useEffect} from "react";
import {useConnection} from "../redux/connection";
import AirDropApi from "../axios/AirDropApi.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {
    getCurrentRound,
    getCurrentRoundInfo,
    getUsdtBalance,
} from "./Web3/WagmiService.ts";
import {
    getToastConfig,
    PRESALE_CONTRACT_ADDRESS,
    USDT_CONTRACT_ADDRESS_BSC,
} from "../assets/Constant.tsx";
import {useAccount, useNetwork} from "wagmi";
import {formatUnits} from "viem";
import {toast, ToastOptions} from "react-toastify";

const notShowFooter = ["/overview", "/profile", "/mentions"];

// @ts-ignore
export function updater<T>(Component: React.ComponentType<any>) {
    return function (props: any) {
        const {
            onSetUserInfo,
            onSetJwtToken,
            onSetCurrentState,
            onSetCurrentStateInfo,
            onSetUsdtBalance,
        } = useConnection();
        const navigate = useNavigate();
        const {address, isConnected} = useAccount();
        const { chain} = useNetwork()


        useEffect(() => {
            checkOldJwt().then();
            getRoundInfo().then();
        }, []);

        useEffect(() => {
            getRoundInfo().then()
        }, [chain]);

        useEffect(() => {
            const handleUpdateLocalStorage = (e: any) => {
                if (e.key === "jwtToken" && e.newValue) {
                    onSetJwtToken(e.newValue);
                    AirDropApi.getUserProfile().then((res) => {
                        if (res.status === 200) onSetUserInfo(res.data);
                    });
                    AirDropApi.getKycMine().then((res) => {
                        if (res.status === 200 && res.data.isTwitterActive) {
                            navigate("/profile");
                        } else {
                            navigate("/verify_twitter");
                        }
                    });
                }
                if (e.key === "error" && e.newValue) {
                    const config = getToastConfig("Error");
                    console.log(e.newValue)
                    toast(e.newValue.split('-')[0], config as ToastOptions);
                }
            }
            window.addEventListener("storage", handleUpdateLocalStorage);
            return () => {
                window.removeEventListener("storage", handleUpdateLocalStorage)
            }
        }, []);

        useEffect(() => {
            if (!isConnected) return;
            addressInfo().then();
            getRoundInfo().then();
        }, [isConnected]);

        const checkOldJwt = async () => {
            const token = localStorage.getItem("jwtToken");
            if (!token) return;
            onSetJwtToken(token);
            const res = await AirDropApi.getUserProfile();
            if (res.status === 200) onSetUserInfo(res.data);
        };

        const getRoundInfo = async () => {
           try {
               const round = await getCurrentRound(PRESALE_CONTRACT_ADDRESS);
               const roundInfo: any = await getCurrentRoundInfo(
                   PRESALE_CONTRACT_ADDRESS,
                   round
               );
               onSetCurrentStateInfo(roundInfo);
               onSetCurrentState(round);
           } catch (error) {
               onSetCurrentStateInfo(null);
               onSetCurrentState(0);
           }
        };

        const addressInfo = async () => {
            const usdtBalance = await getUsdtBalance(
                USDT_CONTRACT_ADDRESS_BSC,
                address as string
            );
            onSetUsdtBalance(Number(formatUnits(usdtBalance, 6)));
        };
        const location = useLocation();
        const {pathname} = location;

        return (
            <>
                <Header/>
                <Component {...props} />
                {notShowFooter.indexOf(pathname) === -1 && <Footer/>}
            </>
        );
    };
}
