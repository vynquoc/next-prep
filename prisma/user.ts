import { UserInterface } from "@/types/types";
import { db } from "@/lib/db";

export const signIn = async (email: keyof UserInterface) => {
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};
