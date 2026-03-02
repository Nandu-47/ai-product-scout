import { Sparkles } from "lucide-react";

interface AiSummaryProps {
  summary: string;
  query: string;
}

const AiSummary = ({ summary, query }: AiSummaryProps) => {
  return (
    <div className="animate-fade-in rounded-xl border border-accent/20 bg-accent/5 p-5">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="text-sm font-semibold ai-gradient-text font-display">AI Response</span>
      </div>
      <p className="text-sm text-muted-foreground mb-1">
        <span className="font-medium text-foreground">"{query}"</span>
      </p>
      <p className="text-sm leading-relaxed text-foreground">{summary}</p>
    </div>
  );
};

export default AiSummary;
