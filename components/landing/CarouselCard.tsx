import HashTag from 'components/landing/HashTag';
import LocationIcon from 'assets/icons/ico-location.svg';
import GroupMember from 'assets/icons/ico-group-member.svg';

interface Tag {
  content: string;
  color: 'green' | 'orange' | 'gray';
}

interface CarouselCardProps {
  tags: Tag[];
  title: string;
  location: string;
  date: string;
  time: string;
  currentMembers: number;
  maxMembers: number;
  ProfilePic: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function CarouselCard({
  tags,
  title,
  location,
  date,
  time,
  currentMembers,
  maxMembers,
  ProfilePic,
}: CarouselCardProps) {
  return (
    <div className="group-card w-[450px] h-[347px] shadow-suldak-card p-[40px] rounded-[20px]">
      <div className="flex gap-x-[12px]">
        {tags.map((tag, index) => (
          <HashTag key={index} content={tag.content} color={tag.color} />
        ))}
      </div>
      <div className="flex text-[32px] font-semibold mt-[24px]">{title}</div>
      <div className="flex text-[24px] text-suldak-gray-500 mb-[20px] items-center">
        <LocationIcon />
        {location} | {date} {time}
      </div>
      <div className="flex items-center">
        <ProfilePic />
        <GroupMember className="ml-[20px]" />
        <div className="text-suldak-gray-600 text-[30px] font-normal">
          <span className="ml-[10px] font-semibold text-suldak-mint-500 text-[30px]">
            {currentMembers}
          </span>
          /{maxMembers}
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;
