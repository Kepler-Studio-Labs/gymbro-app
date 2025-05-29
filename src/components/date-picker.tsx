"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useCalendarStore } from "@/store/calendar-store";
import React from "react";

export function DatePicker() {
  const { date, setDate } = useCalendarStore();

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
  };

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <SidebarGroupLabel className="px-2 py-1.5 text-left text-sm">
          Calendar
        </SidebarGroupLabel>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="w-full"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
