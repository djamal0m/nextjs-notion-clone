"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/assets/cypresslogo.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import ListItem from "../list-item";
import {
  COMPONENTS_LISTS_ITEMS,
  PRICING_LIST_ITEMS,
  RESOURCES_LIST_ITEMS,
} from "@/lib/constants";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/modeToggle";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const Header = () => {
  const [path, setPath] = useState<string>("#products");
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = (await supabase.auth.getUser()).data.user;
        setUser(data);
      } catch (error) {
        throw error;
      }
    };
    fetchUserData();
    //eslint-disable-next-line
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  return (
    <header className="p-4 flex justify-between items-center">
      <Link href="/" className="w-full flex justify-left items-center">
        <Image src={Logo} alt="Cypress Logo" width={25} height={25} />
        <span className="font-semibold dark:text-white">cypress.</span>
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#resources")}
              className={cn({
                "dark:text-white": path === "#resources",
                "dark:text-white/40": path !== "#resources",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {RESOURCES_LIST_ITEMS.map((listItem, index) => (
                  <li key={listItem.title} className="row-span-3">
                    <ListItem
                      key={`${listItem.title}${index}`}
                      href={listItem.href}
                      title={listItem.title}
                    >
                      {listItem.description}
                    </ListItem>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn({
                "dark:text-white": path === "#pricing",
                "dark:text-white/40": path !== "#pricing",
                "font-normal": true,
                "text-xl": true,
              })}
              onClick={() => setPath("#pricing")}
            >
              Pricing
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:grid-row-2">
                {PRICING_LIST_ITEMS.map((item, index) => (
                  <li key={item.title}>
                    <ListItem
                      key={`${item.title}${index}`}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn({
                "dark:text-white": path === "#components",
                "dark:text-white/40": path !== "#components",
                "font-normal": true,
                "text-xl": true,
              })}
              onClick={() => setPath("#components")}
            >
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {COMPONENTS_LISTS_ITEMS.map((item, index) => (
                  <li key={item.title}>
                    <ListItem
                      key={`${item.title}${index}`}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), {
                "dark:text-white": path === "#testimonials",
                "dark:text-white/40": path !== "#testimonials",
                "font-normal": true,
                "text-xl": true,
              })}
              onClick={() => setPath("#testimonials")}
            >
              Testimonials
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <aside className="flex w-full gap-2 justify-end">
        {!user && (
          <>
            <Link href="/login">
              <Button variant="btn-secondary" className="p-1 hidden sm:block">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="btn-primary" className="whitespace-nowrap ">
                Sign Up
              </Button>
            </Link>
          </>
        )}
        {user && (
          <Button
            variant="btn-primary"
            className="whitespace-nowrap"
            onClick={signOut}
          >
            Logout
          </Button>
        )}

        <ModeToggle></ModeToggle>
      </aside>
    </header>
  );
};

export default Header;
