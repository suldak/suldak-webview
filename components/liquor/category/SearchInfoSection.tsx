function SearchInfoSection({ count }: { count: number }) {
  return (
    <section className="h-[44px] px-[20px]">
      <div className="flex items-center justify-between pt-3.5">
        <span className="text-xs font-medium text-suldak-gray-600">
          총 {count}종
        </span>
      </div>
    </section>
  );
}

export default SearchInfoSection;
