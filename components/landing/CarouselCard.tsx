import Image, { StaticImageData } from "next/image";
import HashTag from "components/landing/HashTag";
import LocationIcon from "assets/pngs/image-location.png";
import GroupMember from "assets/pngs/image-group-member.png";

interface Tag {
  content: string;
  color: "green" | "orange" | "gray";
}

interface ProfilePic {
  src: StaticImageData;
  alt: string;
}

interface CarouselCardProps {
  tags: Tag[];
  title: string;
  location: string;
  date: string;
  time: string;
  currentMembers: number;
  maxMembers: number;
  ProfilePics: ProfilePic[];
}

function CarouselCard({
  tags,
  title,
  location,
  date,
  time,
  currentMembers,
  maxMembers,
  ProfilePics,
}: CarouselCardProps) {
  return (
    <div className="flex justify-center pc:w-[480px] pc:px-[15px]">
      <div className="group-card h-[347px] w-[450px] overflow-hidden rounded-[20px] shadow-suldak-card mobile:h-[167px] mobile:w-[200px] mobile:px-[16px] mobile:py-[20px] pc:p-[40px]">
        <div className="tags flex gap-x-[12px] mobile:gap-x-[6px]">
          {tags.map((tag, index) => (
            <HashTag key={index} content={tag.content} color={tag.color} />
          ))}
        </div>
        <div className="mt-[24px] flex items-center text-[32px] font-semibold mobile:mt-[16px] mobile:h-[12px] mobile:text-[16px] mobile:font-medium">
          {title}
        </div>
        <div className="location mt-[15px] flex items-center text-[24px] text-suldak-gray-600 mobile:mt-[12px] mobile:text-[12px] pc:h-[29px]">
          <div className="relative h-[24px] w-[24px] mobile:h-[14px] mobile:w-[14px]">
            <Image src={LocationIcon} alt="location" fill />
          </div>
          {location} | {date} {time}
        </div>
        <div className="mt-[26px] flex items-center mobile:mt-[18px]">
          {ProfilePics.map((pic, index) => (
            <div className="relative h-[72px] w-[72px] mobile:h-[32px] mobile:w-[32px]">
              <Image
                key={index}
                src={pic.src}
                alt={pic.alt}
                fill
                quality={100}
              />
            </div>
          ))}

          <div className="relative ml-[20px] h-[36px] w-[36px] mobile:ml-[10px] mobile:h-[14px] mobile:w-[14px]">
            <Image src={GroupMember} alt="location" fill />
          </div>
          <div className="text-[30px] font-normal text-suldak-gray-600 mobile:text-[14px]">
            <span className="ml-[10px] font-semibold text-suldak-mint-500 mobile:ml-[4px]">
              {currentMembers}
            </span>
            /{maxMembers}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;
