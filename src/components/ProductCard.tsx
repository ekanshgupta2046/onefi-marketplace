import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { Product } from "@/lib/mockData";

export default function ProductCard({ product }: { product: Product }) {
  // Show the first variant's price as the "starting from" price on the grid.
  const displayVariant = product.variants[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-[18px] border border-zinc-200 bg-white p-3 shadow-[0_2px_6px_rgba(20,14,50,0.04)] transition-shadow hover:shadow-[0_6px_16px_rgba(20,14,50,0.08)]"
    >
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-[14px] bg-[#f8f8fa]">
        <div
          className="relative h-full w-full"
          style={{ transform: `scale(${displayVariant.imageScale ?? 1})` }}
        >
          <ProductImage
            src={displayVariant.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 50vw, 200px"
          />
        </div>
      </div>
      <p className="text-[11px] font-medium text-gray-500">{product.brand}</p>
      <h3 className="mt-0.5 truncate text-[14px] font-semibold leading-[1.25] tracking-[-0.012em] text-gray-900">{product.name}</h3>
      <p className="mt-1 text-[13px] font-semibold text-gray-900">
        ₹{displayVariant.price.toLocaleString("en-IN")}
      </p>
      <p className="mt-0.5 text-[11px] font-medium text-brand-success">No-cost EMI available</p>
    </Link>
  );
}
