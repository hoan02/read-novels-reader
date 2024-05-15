"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { menuAccount } from "@/lib/constants";
import { MenuIconType } from "@/types/types";

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const currentPath = usePathname();

  return (
    <div className="flex bg-white lg:shadow-md lg:p-4 lg:gap-4 gap-2 rounded-xl">
      <div className="border-r-[1px]">
        {menuAccount?.map((item: MenuIconType) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.slug}
              className={`flex gap-4 p-4 ${
                currentPath === item.slug ? "bg-green-500 text-white" : ""
              }`}
              key={item.slug}
            >
              <Icon />
              <span className="sm:block hidden">{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex-1 mt-2 lg:mt-0 pr-2 lg:pr-0">{children}</div>
    </div>
  );
}
