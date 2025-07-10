import ProfileOptionsCard from "../components/personal-dashboard/ProfileOptionsCard";
import UserProfileHeader from "../components/personal-dashboard/UserProfileHeader";

const PersonalHome = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <UserProfileHeader />
      <div className="max-w-[80%] mx-auto w-full mt-8">
        <ProfileOptionsCard />
      </div>
    </div>
  );
};

export default PersonalHome;
