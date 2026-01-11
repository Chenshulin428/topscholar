"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface CopilotSidebarProps {
  onClose: () => void
}

export default function CopilotSidebar({ onClose }: CopilotSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm TopScholar Copilot. I can help you understand research papers, find relevant literature for your work, and provide insights on trending topics. What would you like to explore today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const responses = [
        "That's a great question! Based on the papers I've analyzed, I can provide you with some insights...",
        "I found several relevant papers on that topic. Would you like me to highlight the key findings?",
        "Let me search through the latest research for you. This is particularly trending in the current literature.",
        "Interesting direction! Here are some papers that might align with your research interests...",
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="w-96 bg-sidebar text-sidebar-foreground border-l border-sidebar-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-5 border-b border-sidebar-border flex items-center justify-between bg-white">
        <div>
          <h2 className="font-display font-bold text-lg text-foreground">TopScholar</h2>
          <p className="text-xs text-muted-foreground font-sans">AI Research Assistant</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-md transition">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages - Modern ChatGPT-style */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-3 rounded-lg text-sm font-sans ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-secondary text-sidebar-foreground border border-border rounded-bl-sm"
              }`}
            >
              <p className="leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-sidebar-foreground px-4 py-3 rounded-lg border border-border rounded-bl-sm">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Buttons */}
      <div className="px-5 py-3 border-t border-sidebar-border space-y-3 bg-white">
        <div className="grid gap-2 text-xs">
          <button className="px-3 py-2.5 bg-secondary text-sidebar-foreground hover:bg-border rounded-md text-left transition font-sans border border-border">
            💡 Generate Topic Report ($9.9)
          </button>
          <button className="px-3 py-2.5 bg-secondary text-sidebar-foreground hover:bg-border rounded-md text-left transition font-sans border border-border">
            📚 Find Similar Papers
          </button>
        </div>

        <div className="flex gap-2 pt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-2.5 bg-background text-foreground border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="p-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 rounded-md transition text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
