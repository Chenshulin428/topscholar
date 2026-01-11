"use client"

import { useState } from "react"
import Header from "@/components/header"
import JournalTabs from "@/components/journal-tabs"
import IssueController from "@/components/issue-controller"
import OverviewCard from "@/components/overview-card"
import PaperFeed from "@/components/paper-feed"
import CopilotSidebar from "@/components/copilot-sidebar"

export default function Home() {
  const [selectedJournal, setSelectedJournal] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState("2024-12")
  const [copilotOpen, setCopilotOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Journal Navigation */}
          <JournalTabs selectedJournal={selectedJournal} onSelectJournal={setSelectedJournal} />

          {/* Issue Control */}
          <IssueController selectedIssue={selectedIssue} onSelectIssue={setSelectedIssue} />

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* Overview Card */}
            <OverviewCard journal={selectedJournal} issue={selectedIssue} />

            {/* Paper Feed */}
            <PaperFeed journal={selectedJournal} issue={selectedIssue} />
          </div>
        </div>

        {/* AI Copilot Sidebar */}
        {copilotOpen && <CopilotSidebar onClose={() => setCopilotOpen(false)} />}
      </main>
    </div>
  )
}
