import EventCollection from "@/components/shared/EventCollection";
import { SearchParamProps } from "@/types";
import React from "react";

const page = ({ searchParams }: SearchParamProps) => {
  return (
    <div>
      <EventCollection
        searchParams={searchParams}
        params={{
          id: "",
        }}
      />
    </div>
  );
};

export default page;
