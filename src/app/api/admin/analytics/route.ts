import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { subDays, startOfDay, format } from 'date-fns';

export async function GET() {
  try {
    // Basic stats
    const totalProducts = await prisma.product.count();
    
    const interactions = await prisma.interaction.findMany({
      include: { product: true }
    });

    const totalClicks = interactions.filter((i: any) => i.type === 'WHATSAPP_CLICK').length;
    const totalVisits = interactions.filter((i: any) => i.type === 'VISIT').length;
    
    const conversionRate = totalVisits > 0 ? (totalClicks / totalVisits) * 100 : 0;

    // Top Products (by WhatsApp clicks)
    const productStatsMap = new Map();
    interactions.filter((i: any) => i.type === 'WHATSAPP_CLICK' && i.product).forEach((i: any) => {
      const pid = i.productId!;
      const current = productStatsMap.get(pid) || { name: i.product?.nameFr, clicks: 0 };
      productStatsMap.set(pid, { ...current, clicks: current.clicks + 1 });
    });

    const topProducts: any[] = Array.from(productStatsMap.values())
      .sort((a: any, b: any) => b.clicks - a.clicks)
      .slice(0, 5);

    // Time series (Last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      return format(date, 'yyyy-MM-dd');
    }).reverse();

    const chartData = last7Days.map(day => {
      const dayClicks = interactions.filter((i: any) => 
        i.type === 'WHATSAPP_CLICK' && 
        format(new Date(i.timestamp), 'yyyy-MM-dd') === day
      ).length;
      
      const dayVisits = interactions.filter((i: any) => 
        i.type === 'VISIT' && 
        format(new Date(i.timestamp), 'yyyy-MM-dd') === day
      ).length;

      return {
        name: format(new Date(day), 'EEE'),
        clicks: dayClicks,
        visits: dayVisits
      };
    });

    // Recent Activity Feed
    const recentActivity = interactions
      .sort((a: any, b: any) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5)
      .map((i: any) => ({
        id: i.id,
        time: i.timestamp,
        type: i.type,
        product: i.product?.nameFr || 'Inconnu',
        size: i.size
      }));

    return NextResponse.json({
      stats: {
        totalProducts,
        totalClicks,
        totalVisits,
        conversionRate,
        mostClicked: topProducts[0]?.name || 'N/A'
      },
      topProducts,
      chartData,
      recentActivity
    });
  } catch (error) {
    console.error('Analytics Fetch Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
