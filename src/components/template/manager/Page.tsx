import Header from '../home/Header';
import Sidebar from './SideBar';

interface PageProps {
   children: any;
   className?: string;
   noHeader?: boolean;
   noFooter?: boolean;
}

function Page(props: PageProps) {
   return (
      <div
         className="flex h-screen flex-col overflow-hidden"
         style={{
            background: 'white',
         }}
      >
         {!props.noHeader && <Header logged />}
         <div className="flex min-h-0 flex-1 w-full overflow-hidden">
            <Sidebar />
            <div className="min-w-0 flex-1 flex flex-col overflow-y-auto">
               <main
                  className={`flex-1 flex flex-col ${props.className ?? ''}`}
               >
                  {props.children}
               </main>
            </div>
         </div>
      </div>
   );
}

export default Page;
