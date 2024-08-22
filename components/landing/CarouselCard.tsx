import Image from "next/image";
import HashTag from "components/landing/HashTag";
import LocationIcon from "assets/icons/ico-location.svg";
import GroupMember from "assets/icons/ico-group-member.svg";

interface Tag {
  content: string;
  color: "green" | "orange" | "gray";
}

interface ProfilePic {
  src: string;
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
    <div className="flex w-[480px] justify-center px-[15px]">
      <div className="group-card h-[347px] w-[450px] overflow-hidden rounded-[20px] p-[40px] shadow-suldak-card">
        <div className="flex gap-x-[12px]">
          {tags.map((tag, index) => (
            <HashTag key={index} content={tag.content} color={tag.color} />
          ))}
        </div>
        <div className="mt-[24px] flex text-[32px] font-semibold">{title}</div>
        <div className="mt-[15px] flex h-[29px] items-center text-[24px] text-suldak-gray-500">
          <LocationIcon />
          {location} | {date} {time}
        </div>
        <div className="mt-[26px] flex items-center">
          {ProfilePics.map((pic, index) => (
            <Image
              key={index}
              src={pic.src}
              alt={pic.alt}
              width={40}
              height={40}
              className={index > 0 ? "-ml-[16px]" : ""}
            />
          ))}
          <GroupMember className="ml-[20px]" />
          <div className="text-[30px] font-normal text-suldak-gray-600">
            <span className="ml-[10px] text-[30px] font-semibold text-suldak-mint-500">
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
