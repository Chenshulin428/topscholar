"use client"
import PaperCard from "./paper-card"

interface Paper {
  id: string
  title: string
  authors: string[]
  abstractEN: string
  abstractCN: string
  journal: string
  issue: string
  year: number
  doi: string
}

const mockPapers: Paper[] = [
  {
    id: "1",
    title: "Artificial Intelligence in Strategic Management: Mechanisms, Moderators, and Emerging Challenges",
    authors: ["Chen, W.", "Johnson, R.", "Martinez, S."],
    abstractEN:
      "This study examines how AI technologies are reshaping strategic management practices across industries. We identify three primary mechanisms through which AI influences competitive advantage: decision acceleration, pattern recognition at scale, and resource optimization. Through meta-analysis of 247 studies, we demonstrate that organizational maturity and digital infrastructure are critical moderators of AI effectiveness. Our findings challenge the assumption that AI uniformly benefits all firms, revealing that benefits are contingent on complementary organizational capabilities.",
    abstractCN:
      "本研究考察AI技术如何改变跨行业的战略管理实践。我们确定了AI影响竞争优势的三个主要机制：决策加速、规模化模式识别和资源优化。通过对247项研究的荟萃分析，我们证明组织成熟度和数字基础设施是AI有效性的关键调节因素。我们的发现质疑AI对所有企业都有统一收益的假设。",
    journal: "misq",
    issue: "2024-12",
    year: 2024,
    doi: "10.25300/MISQ/2024/001",
  },
  {
    id: "2",
    title: "Consumer Trust in AI-Driven Recommendations: The Role of Explainability and Social Proof",
    authors: ["Wang, L.", "Anderson, P.", "Zhao, Y."],
    abstractEN:
      "With AI-powered recommendation systems becoming ubiquitous in e-commerce, understanding consumer trust has become critical. This experimental study (n=1,200) evaluates how explainability features and social proof mechanisms affect trust formation. We find that algorithmic transparency increases trust by 34% on average, while social proof amplifies this effect. Interestingly, over-explanation can reduce trust, suggesting an optimal information presentation level exists.",
    abstractCN:
      "随着AI推荐系统在电商中的普遍使用，理解消费者信任变得至关重要。本实验研究（n=1,200）评估了解释性特征和社交证明机制如何影响信任形成。我们发现算法透明度平均增加信任34%。",
    journal: "jm",
    issue: "2024-12",
    year: 2024,
    doi: "10.1509/jm.2024.002",
  },
  {
    id: "3",
    title: "Sustainable Digital Supply Chains: Data Integration, Real-time Visibility, and Circular Economy",
    authors: ["Kumar, R.", "Fischer, H.", "Thompson, G."],
    abstractEN:
      "Digital transformation of supply chains offers unprecedented opportunities for sustainability. This qualitative study of 45 firms implementing Industry 4.0 technologies reveals that data integration across supply chain partners is essential for circular economy adoption. We identify three critical success factors: (1) interoperable data systems, (2) stakeholder alignment on sustainability metrics, and (3) real-time visibility into product lifecycles.",
    abstractCN:
      "供应链的数字化转变为可持续性提供了前所未有的机遇。本对45家实施工业4.0技术的公司的定性研究表明，跨供应链合作伙伴的数据整合对循环经济采纳至关重要。",
    journal: "isr",
    issue: "2024-12",
    year: 2024,
    doi: "10.1287/isre.2024.003",
  },
  {
    id: "4",
    title: "Privacy-Aware Marketing: Navigating Regulations, Technology, and Consumer Expectations",
    authors: ["O'Brien, K.", "Patel, V.", "Lee, J."],
    abstractEN:
      "Marketing in the era of GDPR and privacy regulations requires rethinking data collection and personalization strategies. This study surveys 600 marketing professionals and analyzes 89 firms' privacy policies. We find that companies adopting privacy-by-design principles achieve equivalent personalization effectiveness with 60% less consumer friction. The shift toward first-party data and contextual targeting creates new strategic opportunities.",
    abstractCN:
      "在GDPR和隐私法规时代的营销需要重新思考数据收集和个性化战略。本研究调查了600名营销专业人士并分析了89家公司的隐私政策。我们发现采用隐私设计原则的公司以60%较少的消费者摩擦实现等效的个性化有效性。",
    journal: "jm",
    issue: "2024-12",
    year: 2024,
    doi: "10.1509/jm.2024.004",
  },
  {
    id: "5",
    title: "Platform Ecosystems and Competitive Dynamics: Winner-Take-All or Coexistence?",
    authors: ["Russo, M.", "Song, X.", "Nakamura, T."],
    abstractEN:
      "Platform ecosystems have created new competitive dynamics that challenge traditional strategy theories. This longitudinal study (2015-2023) tracks 156 platform markets and finds evidence for both winner-take-all and coexistence scenarios depending on three moderating factors: API openness, complementor incentives, and regulatory environment. Our findings suggest that strategic platform design choices are more important than first-mover advantages.",
    abstractCN:
      "平台生态系统创造了挑战传统战略理论的新竞争动态。这项纵向研究（2015-2023）跟踪了156个平台市场，发现了赢家通吃和共存情景的证据。",
    journal: "misq",
    issue: "2024-11",
    year: 2024,
    doi: "10.25300/MISQ/2024/005",
  },
]

interface PaperFeedProps {
  journal: string
  issue: string
}

export default function PaperFeed({ journal, issue }: PaperFeedProps) {
  const papers = mockPapers.filter(
    (p) => (journal === "all" || p.journal === journal) && (issue === "all" || p.issue === issue),
  )

  return (
    <div className="grid gap-4">
      {papers.length > 0 ? (
        papers.map((paper) => <PaperCard key={paper.id} paper={paper} />)
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No papers found for this selection</p>
        </div>
      )}
    </div>
  )
}
