export {};

declare global {
  interface CustomJwtSessionClaims {
    full_name?: string;
    avatar?: string;
    id?: string;
    email?: string;
    public_metadata?: UserPublicMetadata;
  }

  interface UserPublicMetadata {
    frame_avatar?: string;
    premium: {
      state?: boolean;
      start_date?: Date;
      end_date?: Date;
    };
  }

  interface ClerkAuthorization {
    permission: "org:reader:vip" | "org:writer:create";
    role: "org:admin" | "org:writer" | "org:reader";
  }
}
