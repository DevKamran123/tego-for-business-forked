import CustomButton from "./buttons/CustomButton";

const SectionCTA = () => {
  return (
    <div className="flex items-center gap-4">
      <CustomButton size="small">Get Started</CustomButton>
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
