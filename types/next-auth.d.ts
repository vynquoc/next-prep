import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;
type Role = "user" | "admin";

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: Role;
    };
  }
}
