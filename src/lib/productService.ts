import { mockProducts, Product } from "./mockData";

const SIMULATED_LATENCY_MS = 500;

function delay<T>(value: T, ms = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getProducts(): Promise<Product[]> {
  return delay(mockProducts);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const product = mockProducts.find((p) => p.slug === slug) ?? null;
  return delay(product);
}
