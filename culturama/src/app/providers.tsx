"use client";
import { DataProvider } from "@/context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <DataProvider>{children}</DataProvider>;
}
