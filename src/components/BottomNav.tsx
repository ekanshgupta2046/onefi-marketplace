"use client";

import { usePathname, useRouter } from "next/navigation";

// Shop bottom nav: Home / Shop / EMI Dues / Limit / Profile.
// Only Shop is implemented for this assignment.
const NAV_ITEMS = [
  { label: "Home", path: "/dashboard", icon: HomeIcon },
  { label: "Shop", path: "/shop", icon: ShopIcon },
  { label: "EMI Dues", path: "/emi-dues", icon: DuesIcon },
  { label: "Limit", path: "/pledged-funds", icon: LimitIcon },
  { label: "Profile", path: "/profile", icon: ProfileIcon },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-[500px] items-stretch rounded-[28px] border border-white/40 bg-white px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset]">
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
        const isActive = pathname.startsWith(path);
        return (
          <button
            key={path}
            onClick={() => router.push(path)}
            className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-2 text-center text-[10px] tracking-wide transition-all duration-200 ${
              isActive ? "font-bold text-brand-primary" : "font-medium text-gray-400 hover:text-gray-600"
            }`}
          >
            {isActive && <span className="absolute left-1/2 -top-[3px] h-[3px] w-8 -translate-x-1/2 rounded-full bg-brand-primary" />}
            {isActive && <span className="absolute inset-1 rounded-[14px] opacity-50" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(113,44,220,0.12) 0%, transparent 70%)" }} />}
            <Icon active={isActive} />
            {label}
          </button>
        );
      })}
      </div>
    </nav>
  );
}

type IconProps = { active: boolean };

function HomeIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShopIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8h16l-1 11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 8ZM8 8V6a4 4 0 0 1 8 0v2"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DuesIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.6}
      />
      <path d="M4 10h16" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
    </svg>
  );
}

function LimitIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v18M6 7.5c0-1.5 2-2.5 4-2.5s4 1 4 2.5-2 2-4 2-4 .5-4 2 2 2.5 4 2.5 4-1 4-2.5"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} />
      <path
        d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}
