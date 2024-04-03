import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="mt-5 flex flex-col flex-center gap-3 py-3 sm:flex-row border-t-2 sm:justify-evenly">
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

        {/* copywright */}
        <p className="text-sm">2024 Eventhub. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
