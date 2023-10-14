import { ITimeLeft } from "./Interface.ts";
import { toast } from "react-toastify";

const textShareTwitter =
  "👀 I just joined #BabbuCity: New SocialFi Network.\n" +
  "🎁 Allows Connect Twitter/X with @BabbuCity to Earn $Bucoin, $Butip.\n" +
  "🥰 Connect and share with more friends. More money every day.💰\n" +
  "Check out → https://babbu.io and sign up with me today!";

const textQuoteTwitter =
  "😍#BabbuCity: New SocialFi Network.\n" +
  "We connect you with Twitter/Facebook.\n" +
  "💎 Time is diamond, earn $Bucoin $Butip on #BabbuCity platform is about to start.\n" +
  "⏳Don't waste any more time. Follow Me to Earn.";
const urlShareTwitter =
  "https://twitter.com/BabbuCity/status/1712671491396133091";
const defaultDataTimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};
const calculateTimeLeft = (start: number): ITimeLeft => {
  const difference = +new Date(start) - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft as ITimeLeft;
};

const minimizeText = (id: string) => {
  if (!id) {
    return "";
  }
  if (id.length > 10) {
    return id.slice(0, 4) + "..." + id.slice(id.length - 4, id.length);
  }
  return id;
};

const getToastConfig = (status: string) => {
  return {
    position: toast.POSITION.TOP_RIGHT,
    className: "toast-message",
    theme: "dark",
    icon:
      status === "Success" ? (
        <img src={"assets/svg/icon-success.svg"} alt={""} />
      ) : (
        <img src={"assets/svg/icon-error.svg"} alt={""} />
      ),
    hideProgressBar: true,
    closeButton: <img src={"assets/svg/Close-Button.svg"} alt={""} />,
    autoClose: 3000,
    bodyStyle: {
      color: status === "Success" ? "#CDF202" : "#F30A34",
      fontSize: 16,
      fontWeight: 400,
    },
    style: {
      borderRadius: 15,
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      paddingBottom: 5,
      top: 50,
    },
  };
};

const PRESALE_CONTRACT_ADDRESS = "0xfc3Eb85CbBe5DDebAF4Da14517714597606D9E07";
const USDT_CONTRACT_ADDRESS_BSC = "0x73A4F337CA3479Bdb2FB0Cfed5B946D86D60903b";
const USDT_DECIMAL_BSC = 6;
const BU_COIN_DECIMAL_BSC = 18;

const numberWithCommas = (number: string, fixedNumber = 4) => {
  if (!number) return "0";
  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: fixedNumber,
  });
};

export {
  textShareTwitter,
  urlShareTwitter,
  textQuoteTwitter,
  defaultDataTimeLeft,
  calculateTimeLeft,
  minimizeText,
  getToastConfig,
  PRESALE_CONTRACT_ADDRESS,
  USDT_DECIMAL_BSC,
  BU_COIN_DECIMAL_BSC,
  numberWithCommas,
  USDT_CONTRACT_ADDRESS_BSC,
};



