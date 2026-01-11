import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();

// 初始化 AI 客户端 (如果没有 Key，稍后会降级为模拟模式)
const apiKey = process.env.AI_API_KEY;
const baseURL = process.env.AI_BASE_URL || 'https://api.deepseek.com';

const openai = apiKey ? new OpenAI({ apiKey, baseURL }) : null;

async function main() {
  console.log('🧠 AI 翻译官准备就绪...');

  // 1. 找出所有还没有中文标题的论文
  const papersToTranslate = await prisma.paper.findMany({
    where: {
      titleCn: null, // 只找还没翻译过的
    },
    take: 10, // 为了安全，一次先试 10 篇
  });

  if (papersToTranslate.length === 0) {
    console.log('✅ 所有论文都已经翻译过了！');
    return;
  }

  console.log(`🔍 发现 ${papersToTranslate.length} 篇待翻译论文，开始工作...`);

  // 2. 逐篇翻译
  for (const paper of papersToTranslate) {
    console.log(`\n📄 正在处理: [${paper.journal}] ${paper.titleEn.substring(0, 30)}...`);

    let translatedTitle = "";
    let translatedAbstract: string | null = "";

    try {
      if (openai) {
        // === 真实 AI 模式 ===
        const prompt = `
          你是一个专业的学术翻译助手。请将以下论文信息翻译成中文。
          要求：信、达、雅，符合学术规范。
          
          标题: ${paper.titleEn}
          摘要: ${paper.abstractEn || "无摘要"}

          请严格按照以下 JSON 格式返回（不要包含 Markdown 代码块）：
          {
            "title": "中文标题",
            "abstract": "中文摘要"
          }
        `;

        const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "deepseek-chat", // 或者 "gpt-3.5-turbo"
          response_format: { type: "json_object" }, // 强制让 AI 返回 JSON，防止废话
        });

        const result = JSON.parse(completion.choices[0].message.content || "{}");
        translatedTitle = result.title;
        translatedAbstract = result.abstract;
        console.log(`   ✨ AI 翻译成功`);

      } else {
        // === 模拟模式 (如果你没有 API Key) ===
        // 仅仅为了演示流程跑通
        translatedTitle = `[中文] ${paper.titleEn}`;
        translatedAbstract = paper.abstractEn ? `[中文摘要] ${paper.abstractEn.substring(0, 50)}...` : null;
        console.log(`   ⚠️ 无 API Key，使用模拟翻译`);
        // 模拟一点延时
        await new Promise(r => setTimeout(r, 100));
      }

      // 3. 更新回数据库
      if (translatedTitle) {
        await prisma.paper.update({
          where: { id: paper.id },
          data: {
            titleCn: translatedTitle,
            abstractCn: translatedAbstract
          }
        });
        console.log(`   💾 已保存到数据库`);
      }

    } catch (error) {
      console.error(`   ❌ 翻译失败:`, error);
    }
  }

  console.log('\n🎉 本批次翻译完成！去 Workbench 看看吧！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
