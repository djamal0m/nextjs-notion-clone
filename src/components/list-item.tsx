import React from "react";
import { NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

// ListItem is a React component that forwards a ref to an <a> element.
// It accepts all the props an <a> element would take, excluding the ref prop.
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "group block select-none space-y-1 font-medium leading-none",
          className
        )}
        {...props}
      >
        <div className="text-white text-sm font-medium leading-none">
          {title}
        </div>
        <p className="group-hover:text-white/70 line-clamp-2 text-sm leading-snug text-white-40">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  );
});

ListItem.displayName = "ListItem";
export default ListItem;
