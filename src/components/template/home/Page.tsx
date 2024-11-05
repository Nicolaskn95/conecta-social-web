import Footer from "./Footer";
import Header from "./Header";

interface PageProps {
  children: any;
  className?: string;
  noHeader?: boolean;
  noFooter?: boolean;
}
function Page(props: PageProps) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "white",
      }}
    >
      <div className="flex-1 flex flex-col w-screen">
        {!props.noHeader && <Header logged={false} />}
        <main className={`flex-1 flex flex-col ${props.className ?? ""}`}>
          {props.children}
        </main>
        {!props.noFooter && <Footer />}
      </div>
    </div>
  );
}

export default Page;
