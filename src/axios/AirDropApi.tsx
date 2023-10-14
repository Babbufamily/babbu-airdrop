import axiosClient from "./AxiosClient.tsx";

const BabbuCityApi = {
    login: async (email: string): Promise<any> => {
        const url = "/user/login";
        return await axiosClient.post(url, {
            email,
        });
    },

    verifyEmail: async (data: any): Promise<any> => {
        const url = "/user/verify-email";
        return await axiosClient.post(url, {email: data.email.trim().toLowerCase(), code: data.code});
    },

    getUserProfile: async (): Promise<any> => {
        const url = "/user/get-user-profile";
        return await axiosClient.get(url);
    },

    loginWithTwitter: async (): Promise<any> => {
        const url = "/user-kyc/twitter/auth";
        return await axiosClient.get(url);
    },

    loginWithWeb3: async (data: any): Promise<any> => {
        const url = "/user/sign-in-web3";
        return await axiosClient.post(url, data);
    },

    connectWeb3: async (data: any): Promise<any> => {
        const url = "/user/connect-web3";
        return await axiosClient.post(url, data);
    },

    kycTwitter: async (): Promise<any> => {
        const url = "/user-kyc/twitter/logged/auth";
        return await axiosClient.get(url);
    },

    getKycMine: async (): Promise<any> => {
        const url = "/user-kyc/mine";
        return await axiosClient.get(url);
    },

    kycTelegram: async (data: any): Promise<any> => {
        const url = "/user-kyc/telegram";
        return await axiosClient.post(url, data);
    },

    kycFacebook: async (data: any): Promise<any> => {
        const url = "/user-kyc/facebook";
        return await axiosClient.post(url, data);
    },

    checkKycTwitter: async (): Promise<any> => {
        const url = "/user-kyc/twitter-active";
        return await axiosClient.get(url);
    },

    addToWhiteList: async (): Promise<any> => {
        const url = "/user-kyc/add-to-white-list";
        return await axiosClient.post(url);
    },

    getMyPosted: async (): Promise<any> => {
        const url = "/twitter-earn/twitter-posts/mine/count";
        return await axiosClient.get(url);
    },

    updateReactions: async (): Promise<any> => {
        const url = "/twitter-earn/twitter-posts/update-reactions";
        return await axiosClient.get(url);
    },

    twitterPostMineAsync: async (): Promise<any> => {
        const url = "/twitter-earn/twitter-posts/mine/sync";
        return await axiosClient.get(url);
    },

    twitterPostMine: async (): Promise<any> => {
        const url = "/twitter-earn/twitter-posts/mine";
        return await axiosClient.get(url);
    },

    mentionCount: async (): Promise<any> => {
        const url = "/twitter-earn/twitter-posts/mine/count-all-in-day";
        return await axiosClient.get(url);
    },

    overViewRanking: async (): Promise<any> => {
        const url = "/user/ranking";
        return await axiosClient.get(url);
    },

    updateBabbuName: async (data: any): Promise<any> => {
        const url = "/user/update-babbu-profile";
        return await axiosClient.post(url, data);
    },

    uploadImageFile: async (data: any): Promise<any> => {
        const url = '/upload';
        return await axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getTotalRewardButipTwitter: async (): Promise<any> => {
        const url = "/user/total-twitter-butips"
        return await axiosClient.get(url);
    }
};

export default BabbuCityApi;
