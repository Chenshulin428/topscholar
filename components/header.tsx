export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-display text-lg font-bold">
            T
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">TopScholar</h1>
            <p className="text-xs text-muted-foreground font-sans">Top-Tier Research Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search papers..."
            className="px-4 py-2.5 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
          />
          <button className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition font-sans">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}
