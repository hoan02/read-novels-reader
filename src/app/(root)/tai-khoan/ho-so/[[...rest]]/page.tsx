import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="w-full">
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
