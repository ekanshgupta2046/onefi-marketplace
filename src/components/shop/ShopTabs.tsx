"use client";

import { useState } from "react";
import MarketplaceTab from "./MarketplaceTab";
import { EmptyState } from "@/components/StateViews";

const TABS = ["Top Brands", "Nearby Stores", "1Fi Marketplace"] as const;
type Tab = (typeof TABS)[number];

export default function ShopTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("1Fi Marketplace");

  return (
    <div className="relative z-[2] -mt-7 flex flex-col gap-4 px-1">
      <div
        className="flex gap-1.5 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
        role="tablist"
      >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className={`relative flex-1 rounded-full py-[11px] text-center text-[11px] font-semibold tracking-[-0.005em] transition-all sm:text-sm ${
                activeTab === tab
                  ? "bg-white text-brand-primary shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-1.5 left-1/2 h-[2.5px] w-[22px] -translate-x-1/2 rounded-full bg-brand-primary" />
              )}
            </button>
          ))}
      </div>

      {activeTab === "Top Brands" && (
        <div className="mt-3.5 px-1">
          <EmptyState message="Top Brands - coming soon." />
        </div>
      )}
      {activeTab === "Nearby Stores" && (
        <div className="mt-3.5 px-1">
          <EmptyState message="Nearby Stores - coming soon." />
        </div>
      )}
      {activeTab === "1Fi Marketplace" && <MarketplaceTab />}
    </div>
  );
}
