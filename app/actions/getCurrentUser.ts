import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/app/libs/prismadb'

export async function getSession() {
    const session = await getServerSession(authOptions)
    return session

}

export default async function getCurrentUser() {
    try {
        const session = await getSession();
        if (!session?.user?.email) {
            return null;
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })
        if (!user) {
            return null;
        }
        return {...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            emailVerified:user.emailVerified?.toISOString() || null
        }
    }
    catch (err: any) {
        return null;
    }
}