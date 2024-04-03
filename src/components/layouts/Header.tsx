"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser, useAuth, SignOutButton } from "@clerk/nextjs";
import MenuBar from "@/components/custom-ui/MenuBar";
import { novelGenres, novelRanks, subMenuAccount } from "@/lib/constants";
import InputSearch from "@/components/custom-ui/InputSearch";
import { Bell, CircleChevronUp, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const fullName = user?.fullName;
  const avatar = user?.imageUrl;

  return (
    <div className="w-full bg-green-1 h-[60px]">
      <div className="max-w-screen-xl h-full mx-auto flex items-center gap-4 justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
        </Link>
        <div className="flex">
          <MenuBar name="Thể loại" items={novelGenres} />
          <MenuBar name="Bảng xếp hạng" items={novelRanks} />
        </div>
        <InputSearch />
        <div>
          <a
            href="https://writer.doctruyen.io.vn"
            target="_blank"
            className="flex gap-2"
          >
            <CircleChevronUp size={24} />
            Đăng truyện
          </a>
        </div>
        {!isLoaded || !isSignedIn ? (
          <div className="flex gap-4 mx-4 font-medium">
            <Link href="/sign-in">Đăng nhập</Link>
            <Link href="/sign-up">Đăng ký</Link>
          </div>
        ) : (
          <>
            <div>
              <Bell />
            </div>
            <Menubar className="bg-green-1 border-0">
              <MenubarMenu>
                <MenubarTrigger className="h-[60px] rounded-none">
                  <div className="flex items-center">
                    <div className="text-sm">{fullName}</div>
                    <Avatar className="mx-2">
                      <AvatarImage src={avatar} alt="avatar" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </MenubarTrigger>
                <MenubarContent>
                  <div className="p-2 space-y-2">
                    <div className="flex text-sm h-10 justify-center items-center">
                      <Image
                        src="/candy.png"
                        alt="candy"
                        width={24}
                        height={24}
                      />
                      10
                    </div>
                    {subMenuAccount?.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link href={item.slug} key={item.slug}>
                          <MenubarItem className="flex gap-4 text-green-500 cursor-pointer">
                            <Icon size={20} />
                            {item.name}
                          </MenubarItem>
                        </Link>
                      );
                    })}
                    {isSignedIn && (
                      <div className="w-full pt-2 border-t-2 border-gray-400">
                        <button className="flex text-red-600 gap-4">
                          <LogOut />
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
