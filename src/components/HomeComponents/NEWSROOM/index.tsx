import { Component } from "react";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "./NEWSROOM.module.scss";
import Card from "../../Card";

const cx = classNames.bind(styles);

const ListNEWSROOM = [
  {
    img: "assets/svg/CointTelegrap.svg",
    content:
      "Breathing life into Web3 ecosystem: Babbu City and to drive Web3 Adoption",
    imgTime: "assets/svg/Oclock.svg",
    day: "Dec 13, 2023",
  },
  {
    img: "assets/svg/yahoo.svg",
    content: "Babbu NFT Passport publish on the BabbuCity World.",
    imgTime: "assets/svg/Oclock.svg",
    day: "Dec 13, 2023",
  },
  {
    img: "assets/svg/BscNew.svg",
    content: "BABBU City Tip Claim Reward on App.",
    imgTime: "assets/svg/Oclock.svg",
    day: "Dec 13, 2023",
  },
  {
    img: "assets/svg/CointTelegrap.svg",
    content:
      "Breathing life into Web3 ecosystem: Babbu City and to drive Web3 Adoption",
    imgTime: "assets/svg/Oclock.svg",
    day: "Dec 13, 2023",
  },
];

export default class NEWSROOM extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 1000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <div className={cx("container")}>
            <div className={cx("NEWSROOM")}>
              <h2>NEWSROOM.</h2>
              <Slider {...settings}>
                {ListNEWSROOM.map((items, index) => (
                  <div className={cx("me-4", "w-auto")} key={index}>
                    <Card half>
                      <div className={cx("min--height")}>
                        <img
                          style={{ minHeight: "84px", maxHeight: "84px" }}
                          className={cx("w-100")}
                          src={items.img}
                          alt=""
                        />
                        <div className={cx("content--text")}>
                          {items.content}
                        </div>
                        <div className={cx("time")}>
                          <img src={items.imgTime} alt="" />
                          {items.day}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
