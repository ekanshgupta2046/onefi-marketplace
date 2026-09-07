"use client";

import { useEffect, useMemo, useState } from "react";
import ProductImage from "@/components/ProductImage";
import { useRouter } from "next/navigation";
import { getProductBySlug } from "@/lib/productService";
import { Product } from "@/lib/mockData";
import EmiPlanOption from "@/components/EmiPlanOption";
import Button from "@/components/Button";
import { LoadingState, ErrorState } from "@/components/StateViews";

type LoadState = "loading" | "success" | "error" | "not-found";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [retryToken, setRetryToken] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [planSelectionOwner, setPlanSelectionOwner] = useState<string | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;

    getProductBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setState("not-found");
          return;
        }
        setProduct(data);
        setSelectedVariantId(data.variants[0]?.id ?? null);
        setPlanSelectionOwner(data.variants[0]?.id ?? null);
        setState("success");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [slug, retryToken]);

  const retry = () => {
    setState("loading");
    setRetryToken((t) => t + 1);
  };

  const selectedVariant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId) ?? null,
    [product, selectedVariantId]
  );

  if (selectedVariantId !== null && planSelectionOwner !== selectedVariantId) {
    setPlanSelectionOwner(selectedVariantId);
    setSelectedPlanId(null);
  }

  if (state === "loading") return <LoadingState label="Loading product..." />;
  if (state === "error")
    return <ErrorState message="Couldn't load this product." onRetry={retry} />;
  if (state === "not-found")
    return <ErrorState message="This product could not be found." />;
  if (!product || !selectedVariant) return null;

  const selectedPlan = selectedVariant.emiPlans.find(
    (p) => p.id === selectedPlanId
  );

  return (
    <main className="flex flex-col">
      <div className="relative w-full aspect-square bg-gray-50">
        <div
          className="relative h-full w-full"
          style={{ transform: `scale(${selectedVariant.imageScale ?? 1})` }}
        >
          <ProductImage
            src={selectedVariant.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(min-width: 500px) 500px, 100vw"
            priority
          />
        </div>
      </div>

      <div className="px-4 pt-4">
        <p className="text-xs text-gray-500">{product.brand}</p>
        <h1 className="text-lg font-semibold">
          {product.name} {selectedVariant.attributes.storage}
        </h1>

        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-xl font-bold">
            ₹{selectedVariant.price.toLocaleString("en-IN")}
          </p>
          {selectedVariant.mrp > selectedVariant.price && (
            <p className="text-sm text-gray-400 line-through">
              ₹{selectedVariant.mrp.toLocaleString("en-IN")}
            </p>
          )}
        </div>

        {/* Variant selector */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Select variant</p>
          <div className="flex gap-2 flex-wrap">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`px-3 py-2 rounded-lg border text-xs font-medium ${
                  variant.id === selectedVariantId
                    ? "border-brand-primary text-brand-primary bg-brand-primary-light"
                    : "border-brand-border text-gray-600"
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>

        {/* EMI plans */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">
            EMI plans backed by mutual funds
          </p>
          <div className="flex flex-col gap-2">
            {selectedVariant.emiPlans.map((plan) => (
              <EmiPlanOption
                key={plan.id}
                plan={plan}
                selected={plan.id === selectedPlanId}
                onSelect={setSelectedPlanId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
    <div className="sticky bottom-0 w-full bg-white border-t border-brand-border p-4">
        <Button
          disabled={!selectedPlan}
          onClick={() => {
            if (!selectedPlan) return;
            router.push("/shop");
          }}
        >
          {selectedPlan
            ? `Proceed with ₹${selectedPlan.monthlyAmount.toLocaleString(
                "en-IN"
              )} x ${selectedPlan.tenureMonths} months`
            : "Select an EMI plan to continue"}
        </Button>
      </div>
    </main>
  );
}
