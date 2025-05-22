import ContentPageHeader from "../components/personal-dashboard/ContentPageHeader";
import PersonalInfoList from "../components/personal-dashboard/PersonalInfoList";
import UserAvatar from "../components/personal-dashboard/UserAvatar";

const PersonalInfo = () => {
  const userInfo = {
    firstName: "Daniel",
    lastName: "Victor",
    phone: "+23456789012",
    email: "daniel.victor@anymail.com",
  };

  return (
    <div className="w-full h-full flex flex-col">
      <ContentPageHeader title="Personal info." />
      <div className="max-w-[680px] mx-auto w-full flex flex-col gap-10 mt-6">
        <UserAvatar size={170} edit />

        <PersonalInfoList user={userInfo} />
      </div>
    </div>
  );
};

export default PersonalInfo;
