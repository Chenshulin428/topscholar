"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const journals = [
  { id: "all", label: "All", short: "All" },
  { id: "misq", label: "MIS Quarterly", short: "MISQ" },
  { id: "isr", label: "Information Systems Research", short: "ISR" },
  { id: "jm", label: "Journal of Marketing", short: "JM" },
  { id: "jmr", label: "Journal of Marketing Research", short: "JMR" },
  { id: "jcr", label: "Journal of Consumer Research", short: "JCR" },
  { id: "aom", label: "Academy of Management", short: "AOM" },
  { id: "sf", label: "Strategic Finance", short: "SF" },
]

interface JournalTabsProps {
  selectedJournal: string
  onSelectJournal: (journal: string) => void
}

export default function JournalTabs({ selectedJournal, onSelectJournal }: JournalTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="px-6 py-0 flex items-center gap-2">
        {canScrollLeft && (
          <button onClick={() => scroll("left")} className="p-2 hover:bg-secondary rounded-md transition flex-shrink-0">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-1 overflow-x-auto scrollbar-hide flex-1"
        >
          {journals.map((journal) => (
            <button
              key={journal.id}
              onClick={() => onSelectJournal(journal.id)}
              className={`px-4 py-3 whitespace-nowrap text-sm font-serif font-medium transition border-b-2 flex-shrink-0 ${
                selectedJournal === journal.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              title={journal.label}
            >
              {journal.short}
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="p-2 hover:bg-secondary rounded-md transition flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
