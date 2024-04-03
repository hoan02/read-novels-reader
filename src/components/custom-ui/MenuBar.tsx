import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MenuType } from "@/lib/types";

type MenuBarType = {
  name: string;
  items: MenuType[];
};

const MenuBar = ({ name, items }: MenuBarType) => {
  return (
    <div>
      <Menubar className="bg-green-1 border-0">
        <MenubarMenu>
          <MenubarTrigger className="h-[60px] rounded-none">
            {name}
          </MenubarTrigger>
          <MenubarContent>
            {items.map((item) => {
              return (
                <Link key={item.slug} href={`/truyen/${item.slug}`}>
                  <MenubarItem className="text-green-500 cursor-pointer">
                    {item.name}
                  </MenubarItem>
                </Link>
              );
            })}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default MenuBar;
