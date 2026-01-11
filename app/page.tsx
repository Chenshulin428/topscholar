// app/page.tsx
import { prisma } from '@/lib/prisma';
import HomeClient from './home-client';

export const dynamic = 'force-dynamic';

interface Paper {
  id: number
  titleEn: string
  titleCn: string | null
  journal: string
  year: number
  authors: any
  abstractEn: string | null
  abstractCn: string | null
  doi: string
}

export default async function Page() {
  let rawPapers: Paper[] = [];
  
  try {
    // 检查是否有数据库 URL
    if (process.env.DATABASE_URL) {
      rawPapers = await prisma.paper.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }) as Paper[];
    }
  } catch (e) {
    // 如果数据库连接失败（构建时或运行时），使用空数组
    // 这不会阻止构建完成
    if (process.env.NODE_ENV !== 'production' || process.env.VERCEL) {
      console.warn("Database connection failed, using empty data:", e instanceof Error ? e.message : String(e));
    }
    rawPapers = [];
  }
  
  return <HomeClient initialPapers={rawPapers} />;
}
