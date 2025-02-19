'use server'
import prisma from "./prisma";


// GET USER BY EMAIL
export async function getUserByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });
      return user
    } catch (error) {
      throw error;
    }
  }