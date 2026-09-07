import ShopTabs from "@/components/shop/ShopTabs";
import ShopBanner from "@/components/shop/ShopBanner";
import BottomNav from "@/components/BottomNav";

export default function ShopPage() {
  return (
    <>
      <main className="flex min-h-screen flex-1 flex-col gap-5 px-4 py-4 pb-[calc(5rem+env(safe-area-inset-bottom))]">
        <div className="relative pb-24">
          <ShopBanner />
          <ShopTabs />
        </div>
      </main>
      <BottomNav />
    </>
  );
}
