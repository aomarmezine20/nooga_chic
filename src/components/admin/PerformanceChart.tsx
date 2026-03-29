'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import styles from '@/app/[locale]/admin/page.module.css';

interface ChartProps {
  data: any[];
  type: 'line' | 'bar';
}

export default function PerformanceChart({ data, type }: ChartProps) {
  if (!data || data.length === 0) {
    return <div className={styles.chartPlaceholder}>Aucune donnée disponible</div>;
  }

  if (type === 'bar') {
    return (
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30, top: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 10, fill: '#888' }} 
              width={100}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="clicks" radius={[0, 4, 4, 0]} barSize={20} fill="#000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#888' }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="visits" 
            stroke="#ddd" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#000" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#000', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
