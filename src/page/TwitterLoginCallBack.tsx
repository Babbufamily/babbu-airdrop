import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import AirDropApi from "../axios/AirDropApi.tsx";
import {getToastConfig} from "../assets/Constant.tsx";
import {toast, ToastOptions} from "react-toastify";

export default function TwitterLoginCallBack() {
    const [searchParams] = useSearchParams();
    const error = searchParams.get('error');
    const accessToken = searchParams.get('accessToken');
    const stateInQuery = searchParams.get('state');
    const stateInLocalStorage = localStorage.getItem('TwitterLoginStateCode');
    const navigate = useNavigate();



    useEffect(() => {
        if (error) {
            window.localStorage.setItem('error', error + '-' + new Date().getTime())
            showModal('Error', error)
        }
        if (!error && stateInLocalStorage && stateInQuery && stateInQuery === stateInLocalStorage && accessToken) {
            window.localStorage.setItem('jwtToken', accessToken);
        }
        AirDropApi.addToWhiteList().then();
        //close this tab
        navigate('/profile')
    }, [searchParams, stateInLocalStorage]);

    const showModal = (status: string, message: string) => {
        const config = getToastConfig(status);
        toast(message, config as ToastOptions);
    }

    return (<></>)
}
