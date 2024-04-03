"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "../NavItems";
import { User } from "@/constants";
// import SignIn from "@/app/(auth)/SignIn";
import { Cookies, useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
// import User from "@/lib/database/models/user.model";

const Header = () => {
  // const user = User;
  const [isSignIn, setIsSignIn] = useState(false);
  const cookie = new Cookies();
  // const userId = cookie.get("userId");
  const userId = cookie.get("userId");

  useEffect(() => {
    if (userId) {
      setIsSignIn(true);
    }
  }, []);
  // console.log(userId);
  return (
    <div>
      <header className="w-full border-b">
        <div className="p-3  flex items-center justify-between lg:mx-10">
          {/* logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/icons/logo4.png"
              width={48}
              height={48}
              alt="image"
              className="rounded-full object-cover"
            />
            <h1 className="ml-[-10px] font-semibold text-3xl ">venthub</h1>
          </Link>

          {/* laptop nav */}
          <div className=" lg:flex hidden items-center gap-10 ">
            {userId !== undefined && <NavItems />}

            <div
              className={
                userId !== undefined ? "flex justify-center gap-5 " : "hidden"
              }
            >
              <Link href={`/profile/${userId}`}>
                <Image
                  src="/assets/images/profile.jpg"
                  width={30}
                  height={30}
                  alt="img"
                  className="rounded-full "
                />
              </Link>
            </div>
          </div>

          {/* sign-in */}
          <div
            className={
              userId === undefined ? "flex " : "w-32 justify-end gap-3 hidden"
            }
          >
            <Button className=" bg-purple-800 rounded-full" size="lg">
              <Link href="/sign-up">{isSignIn ? "login" : "Signup"}</Link>
            </Button>
          </div>

          {/* mobile nav */}
          <div
            className={
              userId !== undefined
                ? "flex justify-center gap-5 lg:hidden"
                : "hidden"
            }
          >
            <Link href={`/profile/${userId}`}>
              <Image
                src="/assets/images/profile.jpg"
                width={30}
                height={30}
                alt="img"
                className="rounded-full "
              />
            </Link>
            <Sheet>
              <SheetTrigger>
                <Image
                  src="/assets/icons/menu.svg"
                  alt="img"
                  width={24}
                  height={24}
                />
              </SheetTrigger>
              <SheetContent className="bg-white">
                <SheetHeader>
                  <SheetTitle className="r">
                    <Link href="/">
                      {/* <Image
                        src="/assets/images/logo.svg"
                        width={38}
                        height={38}
                        alt="image"
                        className="w-auto h-auto"
                      /> */}
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    <NavItems />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* {isSignIn && <SignIn setIsSignIn={setIsSignIn} />} */}
    </div>
  );
};

export default Header;
