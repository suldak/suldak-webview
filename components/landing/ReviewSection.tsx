import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TalkImg from 'assets/icons/ico-talk.svg';
import ReviewImg1 from 'assets/pngs/image-review-1.png';
import ReviewImg2 from 'assets/pngs/image-review-2.png';
import ReviewImg3 from 'assets/pngs/image-review-3.png';
import ReviewImg4 from 'assets/pngs/image-review-4.png';
import ReviewImg5 from 'assets/pngs/image-review-5.png';
import ReviewImg6 from 'assets/pngs/image-review-6.png';
import ReviewImg7 from 'assets/pngs/image-review-7.png';
import ReviewImg8 from 'assets/pngs/image-review-8.png';
import ReviewImg9 from 'assets/pngs/image-review-9.png';
import ReviewImg10 from 'assets/pngs/image-review-10.png';

function ReviewSection() {
  const commonSettings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    centerMode: false,
    variableWidth: true,
    pauseOnHover: false,

    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const topSettings = {
    ...commonSettings,
    rtl: false,
  };

  const bottomSettings = {
    ...commonSettings,
    rtl: true,
  };

  const topImages = [
    ReviewImg1,
    ReviewImg2,
    ReviewImg3,
    ReviewImg4,
    ReviewImg5,
    ReviewImg1,
    ReviewImg2,
    ReviewImg3,
    ReviewImg4,
    ReviewImg5,
  ];
  const bottomImages = [
    ReviewImg6,
    ReviewImg7,
    ReviewImg8,
    ReviewImg9,
    ReviewImg10,
    ReviewImg6,
    ReviewImg7,
    ReviewImg8,
    ReviewImg9,
    ReviewImg10,
  ];

  return (
    <div className="w-full bg-gray-100 h-[950px] py-[120px]">
      <div className="px-4">
        <div className="flex items-center  ml-[360px]">
          <TalkImg className="mr-4" />
          <h2 className="text-[32px] font-bold">당신이 궁금해하는 모든 것</h2>
        </div>
        <p className="text-[18px] font-normal mb-8 ml-[360px]">
          먹는 것에 진심인 사람들의 맛집 후기부터,
          <br /> 다양한 주제의 블로그 포스팅까지
        </p>
        <div className="space-y-4 overflow-hidden ">
          <div className="ml-[20px] overflow-hidden h-[250px]">
            <Slider {...topSettings}>
              {topImages.map((img, index) => (
                <div key={index} className="px-4">
                  <div className="w-[416px] h-[250px] relative rounded-[20px]">
                    <Image
                      src={img}
                      alt={`Review image ${(index % 5) + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="mr-[20px] overflow-hidden h-[250px]">
            <Slider {...bottomSettings}>
              {bottomImages.map((img, index) => (
                <div key={index} className="px-4 h-[250px]">
                  <div className="w-[416px] h-[250px] rounded-[20px] relative">
                    <Image
                      src={img}
                      alt={`Review image ${(index % 5) + 6}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewSection;
