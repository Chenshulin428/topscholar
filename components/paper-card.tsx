"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

interface PaperCardProps {
  paper: {
    id: string
    title: string
    authors: string[]
    abstractEN: string
    abstractCN: string
    journal: string
    year: number
    doi: string
  }
}

export default function PaperCard({ paper }: PaperCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="p-8 hover:shadow-md transition bg-white border border-border">
      <div className="space-y-5">
        {/* Title - Serif Font */}
        <h3 className="text-xl font-serif font-bold text-foreground leading-relaxed">{paper.title}</h3>

        {/* Authors */}
        <div className="flex flex-wrap gap-3">
          {paper.authors.map((author, i) => (
            <span key={i} className="text-sm font-sans text-muted-foreground">
              {author}
            </span>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs font-sans text-muted-foreground">
          <span>{paper.year}</span>
          <span className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-sans font-medium">
            {paper.journal.toUpperCase()}
          </span>
          <span className="font-mono">{paper.doi}</span>
        </div>

        {/* Abstract Preview */}
        <div className="space-y-3">
          <p className="font-sans text-sm text-foreground leading-relaxed">{paper.abstractEN.substring(0, 150)}...</p>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            {paper.abstractCN.substring(0, 120)}...
          </p>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-sans font-medium transition"
        >
          {isExpanded ? "Hide Details" : "View Details"}
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <div>
              <h4 className="font-serif font-bold text-foreground mb-3">English Abstract</h4>
              <p className="font-sans text-sm text-foreground leading-relaxed">{paper.abstractEN}</p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-foreground mb-3">中文摘要</h4>
              <p className="font-sans text-sm text-foreground leading-relaxed">{paper.abstractCN}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition text-sm font-sans font-medium">
                Read Full Paper
              </button>
              <button className="flex-1 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition text-sm font-sans font-medium">
                Ask Copilot
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
