"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser, useAuth, SignOutButton } from "@clerk/nextjs";
import { Bell, CircleChevronUp, LogOut, UserRoundCog } from "lucide-react";

import { novelGenres, novelRanks, subMenuAccount } from "@/lib/constants";
import InputSearch from "@/components/custom-ui/InputSearch";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { orgRole } = useAuth();
  const fullName = user?.fullName;
  const avatar = user?.imageUrl;

  return (
    <div className="w-full flex justify-center bg-green-300 ">
      <div className="max-w-7xl w-full p-4 mx-auto h-16 flex justify-between items-center text-gray-700 text-sx font-semibold">
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
                      <div
                        className="px-4 py-1 hover:text-green-500"
                        key={index}
                      >
                        {item.name}
                      </div>
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
                      <div
                        className="px-4 py-1 hover:text-green-500"
                        key={index}
                      >
                        {item.name}
                      </div>
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

          {!isLoaded || !isSignedIn ? (
            <div className="flex gap-4 mx-4 font-medium">
              <Link href="/sign-in">Đăng nhập</Link>
              <Link href="/sign-up">Đăng ký</Link>
            </div>
          ) : (
            <>
              <Badge className="flex my-auto" badgeContent={4} color="primary">
                <Bell size={24} />
              </Badge>
              <div className="parent w-48 relative hover:bg-green-500 hover:text-white cursor-pointer">
                <div className="hover-parent h-16 flex justify-end">
                  <div className="w-full flex my-auto">
                    <div className="grid columns-1 m-auto">
                      <div className="text-sm">{fullName}</div>
                    </div>
                    <Avatar className="mx-2" src={avatar} alt="avatar" />
                  </div>
                </div>
                <div className="child absolute hidden z-50 w-48 bg-white mt-0.5 font-medium text-gray-700">
                  <div className="grid grid-cols-1 p-4 gap-4 shadow-md">
                    <div className="mx-auto">
                      <div className="text-sm text-red-500 mb-2">
                        {orgRole === "org:admin"
                          ? "Admin"
                          : orgRole === "org:writer"
                          ? "Nhà sáng tác"
                          : "Đọc giả"}
                      </div>
                      <div className="flex text-sm">
                        <Image
                          src="/candy.png"
                          alt="candy"
                          width={24}
                          height={24}
                        />
                        10
                      </div>
                    </div>
                    {subMenuAccount?.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div className="flex gap-4" key={index}>
                          <Icon size={24} />
                          <Link href={item.slug}>{item.name}</Link>
                        </div>
                      );
                    })}
                    {orgRole === "org:admin" && (
                      <div className="flex gap-4 text-blue-600">
                        <UserRoundCog size={24} />
                        <Link
                          href="https://admin.doctruyen.io.vn/"
                          target="_blank"
                        >
                          Quản lý
                        </Link>
                      </div>
                    )}
                    {isSignedIn && (
                      <SignOutButton>
                        <button className="flex text-red-600 gap-4 pt-2 border-t-2 border-gray-400">
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
  );
};

export default Header;
