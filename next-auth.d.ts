import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
    interface User extends DefaultUser {
        role: string;
        userId: string
    }
    interface Session {
        user: User
    }


}


declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        role: string
        userId: string
    }
}
