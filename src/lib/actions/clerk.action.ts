import { clerkClient } from "@clerk/nextjs/server";

export const updateUserMetadata = async (clerkId: string, params: any) => {
  const res = await clerkClient.users.updateUserMetadata(clerkId, {
    publicMetadata: params,
  });
  return res;
};
