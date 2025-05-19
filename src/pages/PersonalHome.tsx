import ProfileOptionsCard from "../components/personal-dashboard/ProfileOptionsCard";
import UserProfileHeader from "../components/personal-dashboard/UserProfileHeader";

const PersonalHome = () => {
  //  const userinfo
  const user = {
    name: "Daniel Victor",
    email: "daniel.victor @email.com",
  };

  return (
    <div className="w-full h-full flex flex-col">
      <UserProfileHeader fullName={user.name} email={user.email} />
      <div className="max-w-screen-lg mx-auto w-full mt-8">
        <ProfileOptionsCard />
      </div>
    </div>
  );
};

export default PersonalHome;
