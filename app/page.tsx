import { prisma } from '@/lib/prisma';
import HomeClient from './home-client';

/**
 * ✅ 强制动态渲染
 * 告诉 Next.js 不要尝试在构建阶段将此页面生成为静态 HTML。
 * 这能有效避免在 Vercel Build 过程中因连不上云数据库而导致的报错。
 */
export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    // 1. 尝试从数据库获取最新论文数据
    // 我们增加了 orderBy 和 take，确保首页加载最相关的 200 篇论文
    const rawPapers = await prisma.paper.findMany({
      orderBy: { 
        createdAt: 'desc' 
      },
      take: 200, 
    });

    // 2. 将数据传递给客户端组件进行渲染
    return <HomeClient initialPapers={rawPapers} />;

  } catch (error) {
    /**
     * ✅ 异常捕获逻辑
     * 如果数据库连接失败（例如在 Vercel 构建环境中 IP 未授权或环境变量加载延迟），
     * 我们捕获错误并返回一个空数组。
     * 这样可以保证 Vercel Build 任务能够以“成功”状态结束。
     */
    console.error("Database connection failed. Returning empty list for build safety.", error);
    
    return <HomeClient initialPapers={[]} />;
  }
}
