import classNames from "classnames/bind";
import styles from "./BabbuNetwork.module.scss";
import Card from "../../Card";
const cx = classNames.bind(styles);
function BabbuNetwork() {
  const ListBabbuNetwork = [
    {
      img: "assets/svg/BabbuNftPassport.svg",
      title: "Babbu NFT Passport",
      link: "🌐 lab.babbu.io",
      describe: "Babbu Passport Privileges & Member Profile Bluestick KYC",
    },
    {
      img: "assets/svg/BuwalletMain.svg",
      title: "Bu’wallet Exchange",
      link: "🌐 wallet.babbu.io",
      describe:
        "Securely Hold, Send, Receive, Exchange, Tip & Earn 800+ Cryptocurrencies With Buwallet.",
    },
    {
      img: "assets/svg/ButipLager.svg",
      title: "Butip",
      link: "🌐 tip.babbu.io",
      describe:
        "Affiliate Marketing platform that connects businesses that need to promote products & services.",
    },
    {
      img: "assets/svg/LuckeyDrow.svg",
      title: "Bunus (Lucky Draw)",
      link: "🌐 tip.babbu.io",
      describe: "Airdrop programs receive items. lottery and valuable gifts.",
    },
    {
      img: "assets/svg/GameFileMetaverst.svg",
      title: "Gamefi & Metaverse",
      link: "🌐 mainnet.babbu.io",
      describe:
        "The decentralized coin grows into Babbu’s gamebase Metaverse. Gamefi + NFT + Trading market.",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("Babbu--Network")}>
          <div className={cx("container")}>
            <h2>Babbu Network</h2>
            <div className={cx("row", "justify-content-evenly")}>
              {ListBabbuNetwork.map((items, index) => (
                <div key={index} className={cx("rps--5", "mt-4")}>
                  <Card outLine maxHeight={"310px"} minHeight={"310px"}>
                    <img src={items.img} alt="" />
                    <div className={cx("title")}>{items.title}</div>
                    <div className={cx("link--netword")}>{items.link}</div>
                    <p>{items.describe}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BabbuNetwork;
