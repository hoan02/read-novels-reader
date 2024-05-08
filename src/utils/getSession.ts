import { auth } from "@clerk/nextjs/server";

export function getSessions() {
  const { sessionClaims } = auth();
  const fullName = sessionClaims?.full_name;
  const avatar = sessionClaims?.avatar;
  const clerkId = sessionClaims?.clerkId;
  const email = sessionClaims?.email;
  const role = sessionClaims?.org_role?.slice(4);
  const metadata = sessionClaims?.metadata;

  return { fullName, avatar, clerkId, email, role, metadata };
}
