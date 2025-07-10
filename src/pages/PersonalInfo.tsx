import ContentPageHeader from "../components/personal-dashboard/ContentPageHeader";
import PersonalInfoList from "../components/personal-dashboard/PersonalInfoList";
import UserAvatar from "../components/personal-dashboard/UserAvatar";
import { useUserData } from "../hooks/useUserData";

const PersonalInfo = () => {
  const { userData } = useUserData();

  const userInfo = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phone: userData ? `${userData.countryCode}${userData.mobileNo}` : '',
    email: userData?.email || '',
  };

  return (
    <div className="w-full h-full flex flex-col">
      <ContentPageHeader title="Personal info." />
      <div className="max-w-[50%] mx-auto w-full flex flex-col gap-10 mt-6">
        <UserAvatar size={130} edit />

        <PersonalInfoList user={userInfo} />
      </div>
    </div>
  );
};

export default PersonalInfo;
