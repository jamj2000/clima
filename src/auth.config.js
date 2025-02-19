import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/data";

const AuthConfig = {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        console.log('AUTHORIZE')
        const user = await getUserByEmail(credentials.email)
        return user
    },

      // async authorize(credentials) {
      //   const user = await prisma.user.findUnique({
      //     where: {
      //       email: credentials.email,
      //     },
      //   });

      //   if (user)  // && user.emailVerified
      //   {
      //     const matchPassword = bcrypt.compare(
      //       credentials.password,
      //       user?.password
      //     );
      //     if (matchPassword) return user;
      //   } else {
      //     return null;
      //   }
      // },
    }),
  ],

};

export default AuthConfig;