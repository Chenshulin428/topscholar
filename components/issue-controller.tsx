"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const issues = [
  { id: "2024-12", label: "December 2024 (Latest)" },
  { id: "2024-11", label: "November 2024" },
  { id: "2024-10", label: "October 2024" },
  { id: "2024-09", label: "September 2024" },
  { id: "2024-08", label: "August 2024" },
  { id: "2024-07", label: "July 2024" },
  { id: "2024-06", label: "June 2024" },
  { id: "2024-05", label: "May 2024" },
  { id: "2024-01", label: "January 2024" },
]

interface IssueControllerProps {
  selectedIssue: string
  onSelectIssue: (issue: string) => void
}

export default function IssueController({ selectedIssue, onSelectIssue }: IssueControllerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedLabel = issues.find((i) => i.id === selectedIssue)?.label || "Select Issue"

  return (
    <div className="px-6 py-3 bg-card border-b border-border relative">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Current Issue:</span>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition"
          >
            {selectedLabel}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg z-20 min-w-48">
                {issues.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => {
                      onSelectIssue(issue.id)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition ${
                      selectedIssue === issue.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {issue.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
