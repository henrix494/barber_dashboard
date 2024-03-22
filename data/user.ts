import { db } from "@/db/connect";
export const getUserByUserName = async (username: string) => {
  try {
    const user = await db.barber_users.findFirst({
      where: { username: username },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: number) => {
  try {
    const user = await db.barber_users.findUnique({ where: { id: id } });

    return user;
  } catch {
    return null;
  }
};

export const getAllCoustomerByUserId = async (id: number) => {
  try {
    const users = await db.barber_users.findFirst({
      where: { id: id },
      include: { barber_customers: true },
    });
    return users;
  } catch {
    return null;
  }
};
