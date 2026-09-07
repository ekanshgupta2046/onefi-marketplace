// Mock product/EMI data, shaped like a real API response so the
// service layer below can be swapped for a real backend later
// without touching any component. Images are served locally from
// /public/products.

export type EmiPlan = {
  id: string;
  tenureMonths: number;
  monthlyAmount: number; // in rupees
  interestRate: number; // 0 for no-cost EMI, e.g. 10.5 otherwise
  cashbackAmount: number | null;
};

export type ProductVariant = {
  id: string;
  label: string; // e.g. "256GB Orange"
  mrp: number; // in rupees
  price: number; // in rupees
  imageUrl: string;
  imageScale?: number
  attributes: Record<string, string>; // e.g. { storage: "256GB", color: "Orange" }
  emiPlans: EmiPlan[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  variants: ProductVariant[];
};

function buildEmiPlans(price: number): EmiPlan[] {
  // 0% interest up to 24 months, 10.5% beyond that, flat cashback
  const tenures = [3, 6, 12, 24, 36, 48, 60];
  return tenures.map((tenureMonths) => {
    const interestRate = tenureMonths <= 24 ? 0 : 10.5;
    const totalWithInterest =
      interestRate === 0 ? price : price * (1 + interestRate / 100);
    return {
      id: `emi-${tenureMonths}`,
      tenureMonths,
      monthlyAmount: Math.round(totalWithInterest / tenureMonths),
      interestRate,
      cashbackAmount: 7500,
    };
  });
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    description:
      "The latest iPhone Pro, featuring a titanium design and the A19 Pro chip.",
    variants: [
      {
        id: "p1-v1",
        label: "256GB Silver",
        mrp: 134900,
        price: 127400,
        imageUrl: "/products/iphone-17-pro-silver.jpg",
        attributes: { storage: "256GB", color: "Silver" },
        emiPlans: buildEmiPlans(127400),
      },
      {
        id: "p1-v2",
        label: "256GB Cosmic Orange",
        mrp: 134900,
        price: 131900,
        imageUrl: "/products/iphone-17-pro-orange.jpg",
        attributes: { storage: "256GB", color: "Cosmic Orange" },
        emiPlans: buildEmiPlans(131900),
      },
      {
        id: "p1-v3",
        label: "256GB Deep Blue",
        mrp: 134900,
        price: 131900,
        imageUrl: "/products/iphone-17-pro-blue.jpg",
        attributes: { storage: "256GB", color: "Deep Blue" },
        emiPlans: buildEmiPlans(131900),
      },
    ],
  },
  {
    id: "p2",
    slug: "samsung-galaxy-s25",
    name: "Samsung Galaxy S25",
    brand: "Samsung",
    description:
      "Samsung's flagship with a Snapdragon processor and a refined camera system.",
    variants: [
      {
        id: "p2-v1",
        label: "256GB Mint",
        mrp: 80999,
        price: 67999,
        imageUrl: "/products/samsung-s25-mint.jpg",
        imageScale: 1.0,
        attributes: { storage: "256GB", color: "Mint" },
        emiPlans: buildEmiPlans(67999),
      },
      {
        id: "p2-v2",
        label: "512GB Silver Shadow",
        mrp: 92999,
        price: 84990,
        imageUrl: "/products/samsung-s25-silver.jpg",
        attributes: { storage: "512GB", color: "Silver Shadow" },
        emiPlans: buildEmiPlans(84990),
      },
    ],
  },
  {
    id: "p3",
    slug: "oneplus-15r",
    name: "OnePlus 15R",
    brand: "OnePlus",
    description:
      "Flagship-grade performance with fast charging and a large battery.",
    variants: [
      {
        id: "p3-v1",
        label: "256GB Charcoal Black",
        mrp: 61999,
        price: 59999,
        imageUrl: "/products/oneplus-15r-black.jpg",
        attributes: { storage: "256GB", color: "Charcoal Black" },
        emiPlans: buildEmiPlans(59999),
      },
      {
        id: "p3-v2",
        label: "256GB Electric Violet",
        mrp: 61999,
        price: 59999,
        imageUrl: "/products/oneplus-15r-violet.jpg",
        attributes: { storage: "256GB", color: "Electric Violet" },
        emiPlans: buildEmiPlans(59999),
      },
      {
        id: "p3-v3",
        label: "256GB Mint Breeze",
        mrp: 61999,
        price: 59999,
        imageUrl: "/products/oneplus-15r-mint.jpg",
        attributes: { storage: "256GB", color: "Mint Breeze" },
        emiPlans: buildEmiPlans(59999),
      },
    ],
  },
];
