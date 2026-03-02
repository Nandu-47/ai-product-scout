interface CategoryFilterProps {
  categories: string[];
  active: string | null;
  onSelect: (cat: string | null) => void;
}

const CategoryFilter = ({ categories, active, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          active === null
            ? "ai-gradient-bg text-primary-foreground"
            : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/40"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === active ? null : cat)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            cat === active
              ? "ai-gradient-bg text-primary-foreground"
              : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent/40"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
