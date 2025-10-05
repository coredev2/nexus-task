export const Logo: React.FC = () => {
  return (
    <div className="mb-8 animate-fade-in text-center">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 tracking-tight leading-tight">
        <span className="inline-block">🎬</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          MovieFlix
        </span>
      </h1>
      <p className="text-gray-300 text-base md:text-lg mt-2">
        Discover your next favorite movie
      </p>
    </div>
  );
};
