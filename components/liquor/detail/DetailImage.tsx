interface DetailImageProps {
  name?: string;
  imgUrl?: string;
}

/** 술 상세 이미지 컴포넌트 */
function DetailImage({ name = "술", imgUrl }: DetailImageProps) {
  return (
    <section>
      <div>
        <img
          className="w-full object-cover"
          src={
            imgUrl
              ? `http://122.45.203.134:8080${imgUrl}`
              : "https://via.placeholder.com/300"
          }
          alt={`${name} 사진`}
        />
      </div>
    </section>
  );
}

export default DetailImage;
