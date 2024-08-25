export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "moderator";
      permissions?: string[];
    };
  }
}

export type Roles = "admin" | "moderator" | undefined;
