"use client"

import { Card } from "@/components/ui/card"

interface OverviewCardProps {
  journal: string
  issue: string
}

export default function OverviewCard({ journal, issue }: OverviewCardProps) {
  const getOverview = (journalId: string) => {
    const overviews: Record<string, { title: string; keywords: string[]; trends: string[] }> = {
      all: {
        title: "UTD24 December 2024 Overview",
        keywords: [
          "Digital Transformation",
          "AI & Machine Learning",
          "Consumer Behavior",
          "Sustainability",
          "Data Analytics",
        ],
        trends: [
          "Increased focus on ethical AI applications",
          "Growing emphasis on digital customer experience",
          "Rising importance of ESG metrics",
        ],
      },
      misq: {
        title: "MIS Quarterly - December 2024",
        keywords: ["Information Systems", "Digital Strategy", "IT Governance", "Cloud Computing", "Cybersecurity"],
        trends: [
          "Enterprise digital transformation accelerating",
          "Focus on IT-business alignment",
          "Cloud infrastructure adoption",
        ],
      },
      jm: {
        title: "Journal of Marketing - December 2024",
        keywords: [
          "Marketing Strategy",
          "Consumer Insights",
          "Digital Marketing",
          "Brand Management",
          "Personalization",
        ],
        trends: [
          "AI-powered personalization gaining traction",
          "Omnichannel marketing integration",
          "Real-time customer engagement",
        ],
      },
    }
    return overviews[journalId] || overviews.all
  }

  const overview = getOverview(journal)

  return (
    <Card className="mb-6 p-8 bg-white border border-border shadow-sm">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-6">{overview.title}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-sans font-semibold text-muted-foreground mb-4">Core Topics</h3>
          <div className="flex flex-wrap gap-3">
            {overview.keywords.map((keyword, i) => (
              <span
                key={i}
                className="px-3 py-2 bg-white border border-border text-foreground rounded-md text-xs font-sans font-medium hover:bg-secondary transition"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-sans font-semibold text-muted-foreground mb-4">Key Trends</h3>
          <ul className="space-y-3">
            {overview.trends.map((trend, i) => (
              <li key={i} className="text-sm font-sans text-foreground flex items-start gap-3">
                <span className="text-primary mt-0.5">•</span>
                {trend}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
