import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// UTD24 部分核心期刊列表 (ISSN 映射)
const JOURNALS = [
  { code: 'MISQ', name: 'MIS Quarterly', issn: '0276-7783' },
  { code: 'ISR',  name: 'Information Systems Research', issn: '1047-7047' },
  { code: 'JM',   name: 'Journal of Marketing', issn: '0022-2429' },
  { code: 'JMR',  name: 'Journal of Marketing Research', issn: '0022-2437' },
  { code: 'MS',   name: 'Management Science', issn: '0025-1909' },
  { code: 'JCR',  name: 'Journal of Consumer Research', issn: '0093-5301' }
];

async function main() {
  console.log('🚀 开始批量抓取 UTD24 核心数据...');

  for (const journal of JOURNALS) {
    console.log(`\n📥 正在获取: ${journal.name} (${journal.code})...`);
    
    // 获取最新的 10 篇 (为了演示效果，我们多抓几篇)
    const url = `https://api.crossref.org/journals/${journal.issn}/works?sort=published&order=desc&rows=10`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`❌ 获取 ${journal.code} 失败: HTTP ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      const papers = data.message.items;

      console.log(`   ✅ 找到 ${papers.length} 篇论文，开始入库...`);

      for (const paper of papers) {
        const title = paper.title?.[0] || 'No Title';
        const doi = paper.DOI;
        // 获取年份
        const pubDateParts = paper['published-print']?.['date-parts'] || paper['published-online']?.['date-parts'];
        const year = pubDateParts?.[0]?.[0] || new Date().getFullYear();
        const volume = paper.volume || '';
        const issue = paper.issue || '';
        
        // 作者处理
        const authors = paper.author?.map((a: any) => ({
          given: a.given,
          family: a.family
        })) || [];

        // 存入数据库
        await prisma.paper.upsert({
          where: { doi: doi },
          update: {}, // 如果已存在，不更新（节省资源）
          create: {
            doi: doi,
            titleEn: title,
            journal: journal.name, // 使用我们定义的标准名称
            year: year,
            volume: volume,
            issue: issue,
            authors: authors,
            url: paper.URL,
            abstractEn: paper.abstract || null 
          },
        });
      }
      console.log(`   ✨ ${journal.code} 入库完成！`);
      
    } catch (error) {
      console.error(`   ❌ 处理 ${journal.code} 时出错:`, error);
    }

    // ⚠️ 礼貌延时：Crossref 免费接口如果不加延时，请求太快会被封 IP
    // 暂停 1 秒再抓下一本
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 所有期刊抓取完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
