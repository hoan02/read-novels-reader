import { auth } from "@clerk/nextjs/server";

export default function getSessions() {
  const { sessionClaims } = auth();
  const fullName = sessionClaims?.full_name;
  const avatar = sessionClaims?.avatar;
  const clerkId = sessionClaims?.clerkId;
  const email = sessionClaims?.email;
  const role = sessionClaims?.org_role?.slice(4);
  const frameAvatar = sessionClaims?.public_metadata?.frame_avatar;
  const premiumState = sessionClaims?.public_metadata?.premium.state;
  const premiumStartDate = sessionClaims?.public_metadata?.premium.start_date;
  const premiumEndDate = sessionClaims?.public_metadata?.premium.end_date;

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
