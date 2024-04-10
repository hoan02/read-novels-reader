"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuAccount } from "@/lib/constants";
import { MenuIconType } from "@/lib/types";

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const currentPath = usePathname();

  return (
    <div className="flex bg-white shadow-md p-4 gap-4 rounded-xl">
      <div className="w-1/5 border-r-2 ">
        <div>
          {menuAccount?.map((item: MenuIconType) => {
            const Icon = item.icon;
            return (
              <div
                className={`flex gap-4 p-4 ${
                  currentPath === item.slug ? "bg-green-500 text-white" : ""
                }`}
                key={item.slug}
              >
                <Icon />
                <Link href={item.slug}>{item.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-4/5">{children}</div>
    </div>
  );
}
