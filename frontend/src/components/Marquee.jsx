export default function Marquee({ text }) {
  const StarIcon = () => (
    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
    </svg>
  );

  return (
    <div className="w-full bg-[#E5FF00] text-black border-y-4 border-black font-space font-black uppercase md:text-3xl text-xl py-4 overflow-hidden whitespace-nowrap flex select-none">
      <div className="animate-marquee flex shrink-0 items-center">
        <span className="mx-8">{text}</span>
        <StarIcon />
        <span className="mx-8">{text}</span>
        <StarIcon />
        <span className="mx-8">{text}</span>
        <StarIcon />
        <span className="mx-8">{text}</span>
        <StarIcon />
      </div>
      <div className="animate-marquee flex shrink-0 items-center" aria-hidden="true">
        <span className="mx-8">{text}</span>
        <StarIcon />
        <span className="mx-8">{text}</span>
        <StarIcon />
        <span className="mx-8">{text}</span>
        <StarIcon />
        <span className="mx-8">{text}</span>
        <StarIcon />
      </div>
    </div>
  );
}
