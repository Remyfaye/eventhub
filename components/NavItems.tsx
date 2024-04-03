"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <div>
      {/* mobile view */}
      <div className="mt-5 lg:hidden flex flex-col text-start capitalize ">
        {headerLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <>
              {/* mobile view */}
              <div
                key={link.route}
                className={
                  isActive ? `text-primary-500 my-3` : `text-black my-3`
                }
              >
                <Link href={link.route}>{link.label}</Link>
              </div>

              {/* laptop view */}
              <div></div>
            </>
          );
        })}
      </div>

      {/* laptop view */}
      <div className="hidden lg:flex gap-5  capitalize ">
        {headerLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <>
              <div
                key={link.label}
                className={isActive ? `text-blue-500  my-3` : `text-black my-3`}
              >
                <Link href={link.route}>{link.label}</Link>
              </div>

              <div></div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default NavItems;
