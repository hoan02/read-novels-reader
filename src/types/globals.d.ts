export {};

declare global {
  interface CustomJwtSessionClaims {
    full_name?: string;
    avatar?: string;
    clerkId?: string;
    email?: string;
    metadata: {
      frameAvatar?: string;
    };
  }

  interface ClerkAuthorization {
    permission: "org:reader:vip" | "org:writer:create";
    role: "org:admin" | "org:writer" | "org:reader";
  }
}
