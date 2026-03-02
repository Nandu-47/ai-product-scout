import { useState, FormEvent } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";

interface AskBoxProps {
  onAsk: (query: string) => void;
  isLoading: boolean;
}

const AskBox = ({ onAsk, isLoading }: AskBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onAsk(query.trim());
    }
  };

  const suggestions = [
    "Show me budget laptops",
    "What's good for gaming?",
    "Best for content creators",
    "Affordable accessories",
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/20">
          <div className="flex items-center pl-4 text-muted-foreground">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-accent" />
            ) : (
              <Sparkles className="h-5 w-5 text-accent" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI about products... e.g. 'What's good for gaming?'"
            className="flex-1 bg-transparent px-3 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="mr-2 flex items-center gap-2 rounded-lg ai-gradient-bg px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-40 hover:opacity-90"
          >
            <Search className="h-4 w-4" />
            Ask
          </button>
        </div>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => { setQuery(s); onAsk(s); }}
            disabled={isLoading}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-accent/40 hover:text-foreground disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AskBox;
