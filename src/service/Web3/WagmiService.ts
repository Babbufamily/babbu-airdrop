import {signMessage} from "@wagmi/core";
import {readContract, writeContract} from '@wagmi/core'
import PreSaleAbi from '../../assets/abi/PresaleAbi.json';
import {addressWagmi} from "../../assets/Interface.ts";
import {formatUnits, parseUnits} from 'viem'
import {USDT_DECIMAL_BSC} from "../../assets/Constant.tsx";
import {erc20ABI} from "wagmi";


const SignMessage = async () => {
    const message = "BabbuCity SignIn with Web3 Api. In " + new Date().getTime();
    const signature = await signMessage({message});
    return {message, signature}
}


const getCurrentRound = async (contractAddress: string) => {
    const rounds: any = await readContract({
        address: contractAddress as addressWagmi,
        abi: PreSaleAbi,
        functionName: 'getAllRoundsInfo',
    })
    const time = new Date().getTime() / 1000;
    const activeRound = rounds.filter((round: any) => {
        const startTime = Number(formatUnits(round.startRoundTime, 0));
        const endTime = Number(formatUnits(round.endRoundTime, 0));
        return time >= startTime && time < endTime && !round.isRoundCancelled;
    })
    const CommingSoonRound = rounds.filter((round: any) => {
        const startTime = Number(formatUnits(round.startRoundTime, 0));
        const endTime = Number(formatUnits(round.endRoundTime, 0));
        return time < startTime && time < endTime && !round.isRoundCancelled
    })
    return activeRound.length > 0 ? Number(formatUnits(activeRound[0].roundId, 0)) : Number(formatUnits(CommingSoonRound[0].roundId, 0));
}

const getCurrentRoundInfo = async (contractAddress: string, round: number) => {
    return await readContract({
        address: contractAddress as addressWagmi,
        abi: PreSaleAbi,
        functionName: 'getRoundInfo',
        args: [round]
    })
}

const getUsdtBalance = async (contractAddress: string, address: string) => {
    return await readContract({
        address: contractAddress as addressWagmi,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address as addressWagmi]
    })
}

const getIsWhitelisted = async (contractAddress: string, address: string) => {
    return await readContract({
        address: contractAddress as addressWagmi,
        abi: PreSaleAbi,
        functionName: 'isWhitelisted',
        args: [address]
    })
}

const buyTokenPresale = async (contractAddress: string, round: number, amount: string) => {
    return await writeContract({
        address: contractAddress as addressWagmi,
        abi: PreSaleAbi,
        functionName: 'buyToken',
        args: [round, parseUnits(amount, USDT_DECIMAL_BSC)]
    })
}


const approveAmount = async (address: string, contractAddress: string, amount: string, decimal: number) => {
    return await writeContract({
        address: contractAddress as addressWagmi,
        abi: erc20ABI,
        functionName: 'approve',
        args: [address as addressWagmi, parseUnits(amount, decimal)]
    })
}

const getAmountAllowance = async (contractAddress: string, ownerAddress: string, spenderAddress: string) => {
    return readContract({
        address: contractAddress as addressWagmi,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [ownerAddress as addressWagmi, spenderAddress as addressWagmi]
    })
}

const getHistoryPurchaseAmount = async (contractAddress: string, address: string): Promise<any> => {
    return readContract({
        address: contractAddress as addressWagmi,
        abi: PreSaleAbi,
        functionName: 'getHistoryByAddress',
        args: [address]
    })
}

export {
    SignMessage,
    getCurrentRound,
    getCurrentRoundInfo,
    buyTokenPresale,
    getUsdtBalance,
    getIsWhitelisted,
    approveAmount,
    getAmountAllowance,
    getHistoryPurchaseAmount,
}
