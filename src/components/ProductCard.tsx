import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <Card
      className="group overflow-hidden border border-border bg-card transition-all duration-300 hover:card-shadow-hover hover:border-accent/30 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <span className="text-3xl">{product.image}</span>
          <Badge variant="secondary" className="text-xs font-medium">
            {product.category}
          </Badge>
        </div>
        <h3 className="mb-1 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-foreground">
            ${product.price}
          </span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="text-accent">★</span>
            {product.rating}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
