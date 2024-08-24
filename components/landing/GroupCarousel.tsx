import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfileImg1 from "assets/pngs/image-profile-1.png";
import ProfileImg2 from "assets/pngs/image-profile-2.png";
import ProfileImg3 from "assets/pngs/image-profile-3.png";
import ProfileImg4 from "assets/pngs/image-profile-4.png";
import ProfileImg5 from "assets/pngs/image-profile-5.png";
import ProfileImg6 from "assets/pngs/image-profile-6.png";
import ProfileImg7 from "assets/pngs/image-profile-7.png";
import ProfileImg8 from "assets/pngs/image-profile-8.png";
import CarouselCard from "./CarouselCard";

function GroupCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1820,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1660,
        settings: {
          slidesToShow: 2.75,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2.25,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1.8,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1.5,
        },
      },
    ],
  };

  return (
    <section className="relative mt-[64px] w-full bg-white mobile:mt-[40px]">
      <div className="carousel-container w-full max-w-[1890px] overflow-x-hidden">
        <Slider {...settings}>
          <div className="carousel-item my-3">
            <CarouselCard
              tags={[
                { content: "오프라인", color: "green" },
                { content: "고민상담", color: "gray" },
              ]}
              title="해리포터 얘기 같이해요!"
              location="홍대입구역"
              date="9.21(토)"
              time="오후 5:00"
              currentMembers={1}
              maxMembers={3}
              ProfilePics={[{ src: ProfileImg1, alt: "Profile 1" }]}
            />
          </div>
          <div className="carousel-item my-3">
            <CarouselCard
              tags={[
                { content: "온라인", color: "orange" },
                { content: "스포츠", color: "gray" },
              ]}
              title="KBO같이 보며 한잔"
              location="구글밋"
              date="9.17(화)"
              time="오후 6:30"
              currentMembers={4}
              maxMembers={6}
              ProfilePics={[
                { src: ProfileImg2, alt: "Profile 2" },
                { src: ProfileImg3, alt: "Profile 3" },
                { src: ProfileImg4, alt: "Profile 4" },
              ]}
            />
          </div>
          <div className="carousel-item my-3">
            <CarouselCard
              tags={[
                { content: "온라인", color: "orange" },
                { content: "영화/드라마", color: "gray" },
              ]}
              title="공포영화 같이봐요👻"
              location="디스코드"
              date="9.29(일)"
              time="오후 8:30"
              currentMembers={5}
              maxMembers={6}
              ProfilePics={[
                { src: ProfileImg5, alt: "Profile 5" },
                { src: ProfileImg6, alt: "Profile 6" },
                { src: ProfileImg7, alt: "Profile 7" },
              ]}
            />
          </div>
          <div className="carousel-item my-3">
            <CarouselCard
              tags={[
                { content: "오프라인", color: "green" },
                { content: "고민상담", color: "gray" },
              ]}
              title="마케터너들 주목✨🎉"
              location="강남역"
              date="9.5(목)"
              time="오후 8:00"
              currentMembers={1}
              maxMembers={4}
              ProfilePics={[{ src: ProfileImg8, alt: "Profile 8" }]}
            />
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default GroupCarousel;
