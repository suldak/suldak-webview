import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProfilePic1 from 'assets/icons/ico-profile-pic-1.svg';
import ProfilePic2 from 'assets/icons/ico-profile-pic-2.svg';
import ProfilePic3 from 'assets/icons/ico-profile-pic-3.svg';
import ProfilePic4 from 'assets/icons/ico-profile-pic-4.svg';
import ProfilePic5 from 'assets/icons/ico-profile-pic-5.svg';
import ProfilePic6 from 'assets/icons/ico-profile-pic-6.svg';
import ProfilePic7 from 'assets/icons/ico-profile-pic-7.svg';
import ProfilePic8 from 'assets/icons/ico-profile-pic-8.svg';
import ProfilePic9 from 'assets/icons/ico-profile-pic-9.svg';
import CarouselCard from './CarouselCard';

function GroupCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full mt-[64px] relative bg-white">
      <div className="carousel-container overflow-x-hidden">
        <Slider {...settings}>
          <div className="carousel-item my-3">
            <CarouselCard
              tags={[
                { content: '온라인', color: 'orange' },
                { content: '고민상담', color: 'gray' },
              ]}
              title="취준고민 상담"
              location="구글밋"
              date="9.11(수)"
              time="오후 8:00"
              currentMembers={2}
              maxMembers={3}
              ProfilePic={() => (
                <>
                  <ProfilePic1 />
                  <ProfilePic2 className="-ml-[16px] mr-[20px]" />
                </>
              )}
            />
          </div>
          <div className="carousel-item my-3">
            <CarouselCard
              tags={[
                { content: '온라인', color: 'orange' },
                { content: '스포츠', color: 'gray' },
              ]}
              title="KBO같이 보며 한잔"
              location="구글밋"
              date="9.17(화)"
              time="오후 6:30"
              currentMembers={4}
              maxMembers={6}
              ProfilePic={() => (
                <>
                  <ProfilePic3 />
                  <ProfilePic4 className="-ml-[16px]" />
                  <ProfilePic5 className="-ml-[16px] mr-[20px]" />
                </>
              )}
            />
          </div>
          <div className="carousel-item my-3">
            <CarouselCard
              tags={[
                { content: '온라인', color: 'orange' },
                { content: '영화/드라마', color: 'gray' },
              ]}
              title="공포영화 같이봐요👻"
              location="디스코드"
              date="9.29(일)"
              time="오후 8:30"
              currentMembers={5}
              maxMembers={6}
              ProfilePic={() => (
                <>
                  <ProfilePic6 />
                  <ProfilePic7 className="-ml-[16px]" />
                  <ProfilePic8 className="-ml-[16px] mr-[20px]" />
                </>
              )}
            />
          </div>
          <div className="carousel-item my-3">
            <CarouselCard
              tags={[
                { content: '오프라인', color: 'green' },
                { content: '고민상담', color: 'gray' },
              ]}
              title="마케터너들 주목✨🎉"
              location="강남역"
              date="9.5(목)"
              time="오후 8:00"
              currentMembers={1}
              maxMembers={4}
              ProfilePic={() => <ProfilePic9 />}
            />
          </div>
        </Slider>
      </div>
      {/* <div className="absolute top-0 right-0 w-[109px] h-full bg-white z-10"></div> */}
    </section>
  );
}

export default GroupCarousel;
