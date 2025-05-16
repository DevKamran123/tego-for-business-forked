const SectionCTA = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="bg-darkIndigo text-white text-sm md:text-base lg:text-lg px-6 py-3.5 md:px-12 md:py-7 rounded-lg md:rounded-xl lg:rounded-2xl font-medium">
        Get Started
      </button>
      <a
        href="#"
        className="text-darkBluish font-normal underline text-sm md:text-base"
      >
        Already have an account? Sign in
      </a>
    </div>
  );
};

export default SectionCTA;
