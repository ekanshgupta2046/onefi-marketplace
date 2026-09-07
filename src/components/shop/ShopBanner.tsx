import Image from "next/image";

const BANNER_URL = "https://cdn.1fi.in/banners/shop-page%201536x1024.webp";

export default function ShopBanner() {
  return (
    <section className="-mx-4 -mt-4 overflow-hidden md:-mx-6 md:-mt-6 lg:-mx-8 lg:-mt-8">
      <Image
        src={BANNER_URL}
        alt="Shop today, Pay later using Mutual funds"
        width={800}
        height={400}
        className="w-full scale-110 translate-x-4 object-cover"
        sizes="100vw"
        priority
        unoptimized
      />
    </section>
  );
}
