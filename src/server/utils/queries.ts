import type { DbCartItem, User } from "@prisma/client";
import { addDays, isPast } from "date-fns";
import { ulid } from "ulid";
import { prisma } from "../db";
import * as bcrypt from "bcryptjs";
import { CartItem } from "types/cart";

export const getAllUsers = () => {
  return prisma.user.findMany({});
};

export const getUser = (userId) => {
  return prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
};

export const updateUser = (userId, data) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: { ...data },
  });
};

export const deleteUser = (userId: string) => {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

export const getUserById = (userId: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id: userId } });
};

export const getUserByEmail = (email: string): Promise<User> => {
  return prisma.user.findUniqueOrThrow({ where: { email: email } });
};

export const createForgotPasswordToken = (userId: string) => {
  return prisma.forgotPasswordToken.create({
    data: {
      userId,
      token: ulid(),
      expires: addDays(new Date(), 7),
    },
  });
};

export const verifyUserEmail = async (queryToken: string) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token: queryToken,
    },
  });

  if (!verificationToken || isPast(verificationToken.expires)) {
    return false;
  }

  await prisma.user.update({
    where: {
      id: verificationToken.userId,
    },
    data: { emailVerified: true },
  });

  await prisma.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return true;
};

export const changeUserPassword = async (
  newPassword: string,
  queryToken?: string,
  userId?: string
) => {
  console.log("userId", userId);
  if (userId) {
    var user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  } else {
    var forgotPasswordToken = await prisma.forgotPasswordToken.findFirst({
      where: {
        token: queryToken,
      },
    });
    var user = await prisma.user.findUniqueOrThrow({
      where: {
        id: forgotPasswordToken.userId,
      },
    });
    if (!forgotPasswordToken || isPast(forgotPasswordToken.expires)) {
      console.error(
        `Token not found or expired for change password for user ${user.email}`
      );
      return false;
    }
  }

  if (!newPassword || newPassword.trim().length < 7) {
    console.error(`New password is not valid for user ${user.email}`);
    return false;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);


  await prisma.user.update({
    where: { id: userId ? userId : forgotPasswordToken.userId },
    data: { password: hashedPassword },
  });

  if (!userId) {
    await prisma.forgotPasswordToken.delete({
      where: {
        id: forgotPasswordToken.id,
      },
    });
  }
  console.info(`Password successfully changed for user ${user.email}`);
  return true;
};

export const createPayment = async (
  email: string,
  cartItems: CartItem[],
  token: string
) => {
  const payment = await prisma.payment.create({
    data: {
      email: email,
      token: token,
      successful: false,
      items: cartItems.map(
        (item): DbCartItem => ({
          id: item.id,
          name: item.name,
          price: item.price,
          type: item.type
        })
      ),
    },
  });

  return payment;
};

export const markPaymentAsSuccessful = async (token: string) => {
  const payment = await prisma.payment.findFirst({
    where: {
      token,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  await prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      successful: true,
    },
  });

  return payment;
};

export const getPurchasedItems = async (email: string) => {
  return prisma.payment.findMany({
    where: {
      email,
      successful: true,
    },
  });
};
