import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="w-full py-2">
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
