import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (admin && admin.password === password) {
      // In a real app, use NextAuth or JWT. 
      // For this step, we just return success.
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
