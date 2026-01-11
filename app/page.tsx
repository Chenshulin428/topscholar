import { prisma } from '@/lib/prisma';
import HomeClient from './home-client';

// 服务端组件：负责获取数据
export default async function Page() {
  // 1. 从 MySQL 获取最新的 50 篇论文
  const rawPapers = await prisma.paper.findMany({
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  // 2. 数据清洗 (去除 Crossref 数据中的 XML 标签，如 <jats:p>)
  const papers = rawPapers.map(paper => ({
    ...paper,
    abstractEn: paper.abstractEn ? paper.abstractEn.replace(/<[^>]+>/g, '') : null
  }));

  // 3. 将干净的数据传给客户端组件进行渲染
  return <HomeClient initialPapers={papers} />;
}
