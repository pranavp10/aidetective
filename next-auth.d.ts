import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
 interface Session {
  user: {
   role: string
  } & DefaultSession
 }

 interface User extends DefaultUser {
  role: string;
 }
}


declare module 'next-auth/jwt' {
 interface JWT extends DefaultJWT {
  role: string
 }
}
