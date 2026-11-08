import { RequireAuth } from "@/components/custom/require-auth";

export default function Layout({children}: {children: React.ReactNode}) {
  return <RequireAuth>{children}</RequireAuth>;
}