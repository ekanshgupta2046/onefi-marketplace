"use client";

import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/lib/productService";
import { Product } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import { LoadingState, ErrorState } from "@/components/StateViews";

type LoadState = "loading" | "success" | "error";

export default function MarketplaceTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [retryToken, setRetryToken] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (cancelled) return;
        setProducts(data);
        setState("success");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [retryToken]);

  const retry = () => {
    setState("loading");
    setRetryToken((t) => t + 1);
  };

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <section className="mt-3.5 px-1">
      <div className="flex flex-col gap-3">
      <div className="relative flex h-[46px] items-center gap-[10px] rounded-full border border-gray-200 bg-white px-4">
        <svg
          className="h-[17px] w-[17px] shrink-0 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M21 21l-4.3-4.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="h-9 w-full min-w-0 border-0 bg-transparent px-0 text-[13.5px] text-gray-900 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0"
          aria-label="Search marketplace products"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900">1Fi Marketplace</p>
          <p className="mt-1 text-[13px] leading-[1.45] text-gray-500">Shop devices on no-cost EMIs</p>
        </div>
        <span className="rounded-full bg-[#f5f0ff] px-2.5 py-1 text-[11px] font-semibold text-brand-primary">0% interest</span>
      </div>

      {state === "loading" && <LoadingState label="Loading products..." />}
      {state === "error" && (
        <ErrorState
          message="Couldn't load the marketplace right now."
          onRetry={retry}
        />
      )}
      {state === "success" && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm font-semibold text-gray-700">
            No matching products found
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Try a different product or brand name.
          </p>
        </div>
      )}
      {state === "success" && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-3 pb-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
