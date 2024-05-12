import { useAuth, useUser } from "@clerk/nextjs";

export default function useUserInfoClient() {
  const { user } = useUser();
  const { orgRole } = useAuth();
  const fullName = user?.fullName;
  const avatar = user?.imageUrl;
  const clerkId = user?.id;
  const email = user?.emailAddresses[0].emailAddress;
  const role = orgRole?.slice(4);
  const frameAvatar = user?.publicMetadata?.frame_avatar;
  const premiumState = user?.publicMetadata?.premium?.state;
  const premiumStartDate = user?.publicMetadata?.premium?.start_date;
  const premiumEndDate = user?.publicMetadata?.premium?.end_date;

  return {
    fullName,
    avatar,
    clerkId,
    email,
    role,
    frameAvatar,
    premiumState,
    premiumStartDate,
    premiumEndDate,
  };
}
