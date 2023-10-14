export type IConnectionState = {
    jwtToken: string | null,
    userInfo: any | null,
    currentState: number,
    currentStateInfo: any | null
    usdtBalance: number,
    homeTabActive: 1,
};

export type ITimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export type addressWagmi = `0x{string}`;

