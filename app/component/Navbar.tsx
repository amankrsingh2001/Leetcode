"use client"
import Link from "next/link";
import {
  Bell,
  Code,
  Flame,
  Search,
  LayoutDashboard,
  Folder,
  Play,
  Settings,
  LucideIcon,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";
import { useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const defaultData: NavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard"
  },
  {
    href: "/problems",
    icon: Folder,
    label: "Problems"
  },
  {
    href: "/contests",
    icon: Play,
    label: "Contests"
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings"
  },
];

export default function Navbar(): JSX.Element {

    const pathname = usePathname();
    console.log(pathname)
    const [active, setActive] = useState("Dashboard")


  return (
    <nav className="w-full h-[52px] bg-[#1a1a1a] border-b border-[#2d2d2d] flex items-center justify-between px-4">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-1.5">
        <div className="w-7 h-7 bg-[#ffa116] rounded-md flex items-center justify-center">
          <Code size={15} className="text-[#1a1a1a]" />
        </div>

        <span className="text-[15px] font-medium text-white tracking-tight">
          Code<span className="text-[#ffa116]">Judge</span>
        </span>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-0.5">
        {defaultData.map(({ href, icon: Icon, label }) => (
          <Link
          onClick={(e)=>setActive(label)}
            key={href}
            href={href}
            className={`flex items-center gap-1.5 text-[13px] px-2.5 py-1.5 rounded-md transition-colors ${
            label.toLowerCase() === pathname.split('').slice(1).join('').toLowerCase() ? "text-[#ffa116]" : "text-[#8a8a8a] hover:text-white hover:bg-[#282828]"
            }`}
          >
            <Icon size={15} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-[#282828] border border-[#3a3a3a] rounded-full px-2.5 py-1 text-[12px] font-medium text-[#ffa116]">
          <Flame size={13} />
          <span>42</span>
        </div>

        <div className="w-px h-[18px] bg-[#2d2d2d]" />

        <button
          type="button"
          className="w-8 h-8 rounded-md border border-[#2d2d2d] flex items-center justify-center text-[#8a8a8a] hover:text-white hover:bg-[#282828] transition-colors"
        >
          <Search size={15} />
        </button>

        <button
          type="button"
          className="w-8 h-8 rounded-md border border-[#2d2d2d] flex items-center justify-center text-[#8a8a8a] hover:text-white hover:bg-[#282828] transition-colors"
        >
          <Bell size={15} />
        </button>

        <div className="w-px h-[18px] bg-[#2d2d2d]" />

        <button
          type="button"
          className="w-[30px] h-[30px] rounded-full bg-[#ffa116] flex items-center justify-center text-[12px] font-medium text-[#1a1a1a] border-2 border-transparent hover:border-[#ffa116] hover:bg-[#282828] hover:text-[#ffa116] transition-colors"
        >
          U
        </button>
      </div>
    </nav>
  );
}