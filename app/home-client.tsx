"use client"

import { useState } from "react"
import Header from "@/components/header"
import JournalTabs from "@/components/journal-tabs"
import IssueController from "@/components/issue-controller"
import OverviewCard from "@/components/overview-card"
import CopilotSidebar from "@/components/copilot-sidebar"

// 1. 定义论文数据接口
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

// 2. 期刊映射字典 (Key 必须是大写)
const JOURNAL_MAPPING: Record<string, string> = {
  "MISQ": "MIS Quarterly",
  "ISR": "Information Systems Research",
  "JM": "Journal of Marketing",
  "JMR": "Journal of Marketing Research",
  "MS": "Management Science",
  "JCR": "Journal of Consumer Research",
  "AOM": "Academy of Management Journal",
  "SF": "Strategic Finance"
};

export default function HomeClient({ initialPapers }: { initialPapers: Paper[] }) {
  const [selectedJournal, setSelectedJournal] = useState("MISQ")
  const [selectedIssue, setSelectedIssue] = useState("2024-12")
  const [copilotOpen, setCopilotOpen] = useState(true)

  // === 核心筛选逻辑 ===
  const visiblePapers = initialPapers.filter(paper => {
    const currentTab = selectedJournal.toUpperCase();
    if (currentTab === "ALL") return true;
    const targetFullName = JOURNAL_MAPPING[currentTab];
    return paper.journal === targetFullName || paper.journal === selectedJournal;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          
          <JournalTabs selectedJournal={selectedJournal} onSelectJournal={setSelectedJournal} />
          <IssueController selectedIssue={selectedIssue} onSelectIssue={setSelectedIssue} />

          <div className="flex-1 overflow-y-auto px-6 py-4">
            
            <OverviewCard journal={selectedJournal} issue={selectedIssue} />

            <div className="space-y-6 mt-6 pb-10">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Papers in {selectedJournal.toUpperCase()} ({visiblePapers.length})
              </h3>

              {visiblePapers.length === 0 ? (
                <div className="p-10 text-center border-2 border-dashed rounded-xl bg-gray-50">
                  <p className="text-gray-500">暂无该期刊数据</p>
                  <p className="text-sm text-gray-400 mt-2">
                    请尝试切换到 JCR, MISQ 等其他标签查看
                  </p>
                </div>
              ) : (
                visiblePapers.map((paper) => (
                  <div key={paper.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                    
                    {/* === 1. 英文标题 (主标题) === */}
                    <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                      <a href={`https://doi.org/${paper.doi}`} target="_blank" className="hover:text-blue-600 transition-colors">
                        {paper.titleEn}
                      </a>
                    </h2>
                    
                    {/* === 2. 中文标题 (副标题) === */}
                    {paper.titleCn && (
                      <div className="text-base text-gray-600 mb-3 font-medium">
                        {paper.titleCn}
                      </div>
                    )}
                    
                    {/* 作者信息 */}
                    <div className="text-sm text-gray-500 mb-4 font-medium mt-2">
                      <span className="text-gray-400 mr-2">Authors:</span>
                      {Array.isArray(paper.authors) 
                        ? (paper.authors as any[]).map((a) => `${a.given} ${a.family}`).join(', ')
                        : 'Unknown Authors'}
                    </div>

                    {/* === 3. 摘要区域 (英 + 中) === */}
                    {(paper.abstractEn || paper.abstractCn) && (
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        
                        {/* 英文摘要 */}
                        {paper.abstractEn && (
                          <p className="text-slate-800 text-sm leading-relaxed font-sans">
                            {paper.abstractEn}
                          </p>
                        )}

                        {/* 如果同时有中文和英文，加一条分割线 */}
                        {paper.abstractEn && paper.abstractCn && (
                          <div className="border-t border-slate-200 my-3"></div>
                        )}

                        {/* 中文摘要 */}
                        {paper.abstractCn && (
                          <div className="text-slate-600 text-sm leading-relaxed">
                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-1 rounded mr-1 select-none">
                              译
                            </span>
                            {paper.abstractCn}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 底部信息栏 */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
                          {paper.year}
                        </span>
                        <span className="text-xs text-gray-400 px-2 py-1 bg-gray-100 rounded-md">
                          {paper.journal}
                        </span>
                      </div>
                      <a href={`https://doi.org/${paper.doi}`} target="_blank" className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                        View DOI ↗
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {copilotOpen && <CopilotSidebar onClose={() => setCopilotOpen(false)} />}
      </main>
    </div>
  )
}
