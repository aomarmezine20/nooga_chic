import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { productId, productName } = body;
  
  console.log(`[ORDER TRACK] Product: ${productName} (ID: ${productId}) clicked at ${new Date().toISOString()}`);
  
  // Here we could save to a DB like Vercel KV or Postgres
  
  return NextResponse.json({ success: true });
}
