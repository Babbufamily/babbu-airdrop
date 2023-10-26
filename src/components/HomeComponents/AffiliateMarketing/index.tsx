import classNames from "classnames/bind";
import styles from "./AffiliateMarketing.module.scss";
import Card from "../../Card";

const cx = classNames.bind(styles);
function AffiliateMarketing() {
  const ListAffiliateMarketing = [
    {
      imgTitle: "assets/svg/1.svg",
      title: "Crypto #Tip",
      description:
        "Dive into the world of cryptocurrency! Trending tokens, NFTs, upcoming WL and more…",
      imgContent: "assets/svg/CreateButip.svg",
    },
    {
      imgTitle: "assets/svg/2.svg",
      title: "Hitech #Gift",
      description:
        "The hottest Electronics gifts of the year! iPad Pro, AirPods Pro, iPhone, PS5, etc.",
      imgContent: "assets/svg/Giftcard.svg",
    },
    {
      imgTitle: "assets/svg/3.svg",
      title: "Travel #Ticket",
      description:
        "Dream about your next adventure! Travel trips, airline flights, Disneyland tickets, and more.",
      imgContent: "assets/svg/CreateButip3.svg",
    },
    {
      imgTitle: "assets/svg/4.svg",
      title: "#GiftCard",
      description:
        "Many coupons and gift cards can be obtained! Steam, Amazon, Sephora, Netflix, etc.",
      imgContent: "assets/svg/CreateButip4.svg",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("Marketing")}>
          <div className={cx("container")}>
            <h2>SocialFi Affiliate Marketing</h2>
            <p>
              Babbu City is a powerful marketing platform that allows you to run
              marketing campaigns that increase engagement and promote your
              business to users.
            </p>
            <div className={cx("row")}>
              {ListAffiliateMarketing.map((items, index) => (
                <div
                  key={index}
                  className={cx(
                    "col-xl-6 col-lg-12 col-md-12  col-sm-12 col-12 mt-4"
                  )}
                >
                  <Card half>
                    <div className={cx("row d-flex align-items-center")}>
                      <div
                        className={cx(
                          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12",
                          "order--2--rps"
                        )}
                      >
                        <div className={cx("d-flex", "align-items-center")}>
                          <img src={items.imgTitle} alt="" />
                          <span className={cx("title--box--Marketing")}>
                            {items.title}
                          </span>
                        </div>
                        <div className={cx("lorem--")}>{items.description}</div>
                      </div>
                      <div
                        className={cx(
                          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-center"
                        )}
                      >
                        <img
                          className={cx("height--img")}
                          src={items.imgContent}
                          alt=""
                        />
                      </div>
                    </div>
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

export default AffiliateMarketing;
