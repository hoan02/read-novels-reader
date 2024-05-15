"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  UserButton,
  ClerkLoaded,
  SignedOut,
  SignOutButton,
  SignedIn,
} from "@clerk/nextjs";
import {
  Bell,
  CircleChevronUp,
  ChevronRight,
  LogOut,
  UserRoundCog,
  Menu,
} from "lucide-react";
import Badge from "@mui/material/Badge";

import { novelGenres, novelRanks, subMenuAccount } from "@/lib/constants";
import InputSearch from "../search/InputSearch";
import AvatarFrame from "../custom-ui/AvatarFrame";
import useUserInfoClient from "@/lib/hooks/useUserInfoClient";
import { Button, Drawer } from "@mui/material";

const Header = () => {
  const { fullName, avatar, role, frameAvatar } = useUserInfoClient();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <div className="w-full flex justify-center bg-green-300">
        <div className="hidden max-w-7xl w-full p-4 mx-auto h-16 lg:flex justify-between items-center text-gray-700 text-sx font-semibold">
          <div className="flex">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={68} height={68} />
            </Link>
            <div className="flex ml-6">
              <div className="parent relative hover:bg-green-500 hover:text-white cursor-pointer">
                <div className="hover-parent h-16 flex">
                  <div className="my-auto m-6 ">Thể loại</div>
                </div>
                <div className="child absolute hidden z-50 w-80 bg-white mt-0.5 font-medium text-gray-700">
                  <div className="grid grid-cols-2 p-2">
                    {novelGenres?.map((item, index) => {
                      return (
                        <Link
                          className="px-4 py-1 hover:text-green-500"
                          key={index}
                          href={`/tim-truyen?type=${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="parent relative hover:bg-green-500 hover:text-white cursor-pointer">
                <div className="hover-parent h-16 flex">
                  <div className="my-auto w-40 pl-6">Bảng xếp hạng</div>
                </div>
                <div className="child absolute hidden z-50 w-40 bg-white mt-0.5 font-medium text-gray-700">
                  <div className="grid grid-cols-1 p-2">
                    {novelRanks?.map((item, index) => {
                      return (
                        <Link
                          className="px-4 py-1 hover:text-green-500"
                          key={index}
                          href={`/tim-truyen?rank=${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 mx-10 relative max-w-md">
            <InputSearch />
          </div>

          <div className="flex gap-6">
            <div className="flex my-auto">
              <Link
                href="https://writer.doctruyen.io.vn/"
                className="flex gap-2"
                target="_blank"
              >
                <CircleChevronUp size={24} />
                Đăng truyện
              </Link>
            </div>

            {!fullName ? (
              <div className="flex gap-4 mx-4 font-medium">
                <Link href="/sign-in">Đăng nhập</Link>
                {/* <Link href="/sign-up">Đăng ký</Link> */}
              </div>
            ) : (
              <>
                {/* <Badge className="flex my-auto" badgeContent={4} color="primary">
                <Bell size={24} />
              </Badge> */}
                <div className="parent w-48 relative hover:bg-green-500 hover:text-white cursor-pointer">
                  <div className="hover-parent h-16 flex justify-end">
                    <div className="w-full flex my-auto">
                      <div className="grid columns-1 m-auto">
                        <div className="text-sm">{fullName}</div>
                      </div>
                      {avatar && (
                        <AvatarFrame
                          className="mx-2"
                          src={avatar}
                          frame={frameAvatar}
                          size={52}
                        />
                      )}
                    </div>
                  </div>
                  <div className="child absolute hidden z-50 w-48 bg-white font-medium text-gray-700">
                    <div className="grid grid-cols-1 p-4 shadow-md">
                      {subMenuAccount?.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div
                            className="flex gap-4 p-2 hover:bg-slate-50"
                            key={index}
                          >
                            <Icon size={24} />
                            <Link href={item.slug}>{item.name}</Link>
                          </div>
                        );
                      })}
                      {role === "admin" && (
                        <div className="flex gap-4 text-blue-600 p-2 hover:bg-slate-50">
                          <UserRoundCog size={24} />
                          <Link
                            href="https://admin.doctruyen.io.vn/"
                            target="_blank"
                          >
                            Quản lý
                          </Link>
                        </div>
                      )}
                      {fullName && (
                        <SignOutButton>
                          <button className="flex text-red-600 gap-4 pt-2 border-gray-400 p-2 hover:bg-slate-50">
                            <LogOut size={24} />
                            Đăng xuất
                          </button>
                        </SignOutButton>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="w-full bg-green-300 flex lg:hidden items-center justify-between">
        <div className="w-[56px] h-[56px]">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={56} height={56} />
          </Link>
        </div>
        <InputSearch />
        <div className="mx-2">
          <div className="cursor-pointer" onClick={() => setOpen(!open)}>
            {avatar ? (
              <AvatarFrame src={avatar} frame={frameAvatar} size={40} />
            ) : (
              <Menu size={32} />
            )}
          </div>
        </div>
      </div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div className="p-2 min-w-[200px]">
          <ChevronRight
            onClick={toggleDrawer(false)}
            size={24}
            className="cursor-pointer"
          />
          <div className="flex items-center my-2 p-2 gap-2 border-y-[1px]">
            <SignedOut>
              <SignInButton>
                <Button variant="outlined" className="my-auto">
                  Đăng nhập
                </Button>
              </SignInButton>
            </SignedOut>
            {avatar && (
              <AvatarFrame src={avatar} frame={frameAvatar} size={40} />
            )}
            <div className="text-sm font-semibold">{fullName}</div>
          </div>
          <div className="flex flex-col pb-2 border-b-[1px]">
            <Link
              className="p-2 hover:bg-slate-50"
              onClick={() => setOpen(!open)}
              href="/tim-truyen"
            >
              👉 Bảng xếp hạng
            </Link>
            <Link
              className="p-2 hover:bg-slate-50"
              onClick={() => setOpen(!open)}
              href="https://writer.doctruyen.io.vn"
              target="_blank"
            >
              🔀 Đăng truyện
            </Link>
          </div>
          <SignedIn>
            <div>
              {subMenuAccount?.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    onClick={() => setOpen(!open)}
                    className="flex gap-4 p-2 hover:bg-slate-50"
                    key={index}
                  >
                    <Icon size={24} />
                    <Link href={item.slug}>{item.name}</Link>
                  </div>
                );
              })}
              {role === "admin" && (
                <div
                  onClick={() => setOpen(!open)}
                  className="flex gap-4 text-blue-600 p-2 hover:bg-slate-50"
                >
                  <UserRoundCog size={24} />
                  <Link href="https://admin.doctruyen.io.vn/" target="_blank">
                    Quản lý
                  </Link>
                </div>
              )}
              <SignedIn>
                <SignOutButton>
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex text-red-600 gap-4 pt-2 p-2 hover:bg-slate-50"
                  >
                    <LogOut size={24} />
                    Đăng xuất
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
          </SignedIn>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
