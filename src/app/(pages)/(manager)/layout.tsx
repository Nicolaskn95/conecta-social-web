import ForceAuthentication from "@/components/shared/ForceAuthentication";
import Page from "@/components/template/manager/Page";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ForceAuthentication>{children}</ForceAuthentication>;
}
