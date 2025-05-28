import ContentPageHeader from "../components/personal-dashboard/ContentPageHeader";

const PersonalActivity = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <ContentPageHeader title="Activity" />
      <div className="max-w-[50%] mx-auto w-full flex flex-col gap-10"></div>
    </div>
  );
};

export default PersonalActivity;
