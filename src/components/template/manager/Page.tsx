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
         className="flex flex-col min-h-screen"
         style={{
            background: 'white',
         }}
      >
         {!props.noHeader && <Header logged />}
         <div className="flex-1 flex w-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
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
