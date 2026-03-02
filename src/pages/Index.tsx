import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { products as fallbackProducts, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AskBox from "@/components/AskBox";
import AiSummary from "@/components/AiSummary";
import CategoryFilter from "@/components/CategoryFilter";
import { Loader2, Package, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Laptops", "Audio", "Wearables", "Tablets", "Accessories", "Cameras"];

const Index = () => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [displayProducts, setDisplayProducts] = useState<Product[]>(fallbackProducts);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAskLoading, setIsAskLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch products from backend
  const fetchProducts = useCallback(async (category?: string | null) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);

      const { data, error: fnError } = await supabase.functions.invoke("products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (fnError) throw fnError;

      const allProducts: Product[] = (data?.products || []).map((p: any) => ({
        ...p,
        image: fallbackProducts.find(fp => fp.id === p.id)?.image || "📦",
      }));

      setProducts(allProducts);
      if (category) {
        setDisplayProducts(allProducts.filter(p => p.category === category));
      } else {
        setDisplayProducts(allProducts);
      }
    } catch {
      // Fallback to local data
      setProducts(fallbackProducts);
      if (category) {
        setDisplayProducts(fallbackProducts.filter(p => p.category === category));
      } else {
        setDisplayProducts(fallbackProducts);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategorySelect = (cat: string | null) => {
    setActiveCategory(cat);
    setAiSummary(null);
    setLastQuery("");
    if (cat) {
      setDisplayProducts(products.filter(p => p.category === cat));
    } else {
      setDisplayProducts(products);
    }
  };

  const handleAsk = async (query: string) => {
    setIsAskLoading(true);
    setError(null);
    setLastQuery(query);
    setActiveCategory(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ask", {
        body: { query },
      });

      if (fnError) throw fnError;

      if (data?.error) {
        setError(data.error);
        toast({ title: "AI Error", description: data.error, variant: "destructive" });
        setDisplayProducts(products);
        setAiSummary(null);
        return;
      }

      const matchedIds: string[] = data?.productIds || [];
      const summary: string = data?.summary || "";

      if (matchedIds.length > 0) {
        const matched = products.filter(p => matchedIds.includes(p.id));
        setDisplayProducts(matched.length > 0 ? matched : products);
      } else {
        setDisplayProducts(products);
      }

      setAiSummary(summary);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to get AI response";
      setError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
      setDisplayProducts(products);
      setAiSummary(null);
    } finally {
      setIsAskLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-accent" />
            <h1 className="font-display text-xl font-bold text-foreground">
              Discvr<span className="ai-gradient-text">AI</span>
            </h1>
          </div>
          <span className="text-xs text-muted-foreground">AI-Powered Product Discovery</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Find the perfect product with <span className="ai-gradient-text">AI</span>
          </h2>
          <p className="text-muted-foreground">
            Ask naturally — our AI understands what you're looking for
          </p>
        </div>

        {/* Ask Box */}
        <div className="mx-auto mb-8 max-w-2xl">
          <AskBox onAsk={handleAsk} isLoading={isAskLoading} />
        </div>

        {/* AI Summary */}
        {aiSummary && (
          <div className="mx-auto mb-6 max-w-2xl">
            <AiSummary summary={aiSummary} query={lastQuery} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mx-auto mb-6 max-w-2xl animate-fade-in rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onSelect={handleCategorySelect}
          />
        </div>

        {/* Product count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {displayProducts.length} product{displayProducts.length !== 1 ? "s" : ""} found
        </p>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Package className="mb-3 h-12 w-12 opacity-30" />
            <p>No products found</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        All &copy; Rights Reserved By Nandhini
      </footer>
    </div>
  );
};

export default Index;
