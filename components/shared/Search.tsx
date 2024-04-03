"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayBounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams as unknown as string,
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams as unknown as string,
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayBounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="bg-slate-100 w-full rounded-2xl my-3 flex-center overflow-hidden bg-grey-50 px-4 py-[10px]">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <input
        placeholder="search"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className="outline-none bg-slate-100 w-full rounded-2xl"
      />
    </div>
  );
};

export default Search;
