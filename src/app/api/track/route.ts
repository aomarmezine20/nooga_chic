import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { type, productId, size } = await request.json();

    if (!type) {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }

    const interaction = await prisma.interaction.create({
      data: {
        type,
        productId,
        size
      }
    });

    return NextResponse.json(interaction);
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
