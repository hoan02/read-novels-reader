export {};

declare global {
  interface CustomJwtSessionClaims {
    full_name?: string;
    avatar?: string;
    clerkId?: string;
    email?: string;
    metadata?: {
      frame_avatar?: string;
      premium?: {
        state: boolean;
        startDate?: Date | null;
        endDate?: Date | null;
      };
    };
  }

  interface ClerkAuthorization {
    permission: "org:reader:vip" | "org:writer:create";
    role: "org:admin" | "org:writer" | "org:reader";
  }
}
