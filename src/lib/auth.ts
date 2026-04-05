import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'text' },
        section: { label: 'Section', type: 'text' },
        stream: { label: 'Stream', type: 'text' },
        dept: { label: 'Dept', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.name) return null;
        const email = credentials.email.toLowerCase().trim();
        
        try {
          let user = await prisma.user.findUnique({ where: { email } });
          
          if (!user) {
            console.log('Registering new user:', email);
            const hash = await bcrypt.hash(credentials.password || 'studyplan123', 10);
            user = await prisma.user.create({
              data: {
                name: credentials.name,
                email,
                section: credentials.section || '10',
                stream: credentials.stream || 'pcmb',
                dept: credentials.dept || 'cse',
                passwordHash: hash,
              },
            });
            
            // Seed default exams
            const now = Date.now();
            await Promise.all([
              prisma.exam.create({ data: { userId: user.id, name: 'Board Exam', subject: 'All', date: new Date(now + 30 * 86400000).toISOString().split('T')[0] } }),
              prisma.exam.create({ data: { userId: user.id, name: 'Unit Test', subject: 'Mathematics', date: new Date(now + 10 * 86400000).toISOString().split('T')[0] } })
            ]);
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            section: user.section,
            stream: user.stream,
            dept: user.dept,
          };
        } catch (error) {
          console.error('AUTH_ERROR:', error);
          throw new Error('Database connection or registration failed.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.section = (user as any).section;
        token.stream = (user as any).stream;
        token.dept = (user as any).dept;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).section = token.section;
        (session.user as any).stream = token.stream;
        (session.user as any).dept = token.dept;
      }
      return session;
    },
  },
};
