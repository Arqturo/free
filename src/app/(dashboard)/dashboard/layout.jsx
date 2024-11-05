import NavDashboard from '@/components/dashboard/NavDashboard';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children  }) {


  return (
        <div className="flex flex-col h-screen bg-gray-100 ">
            {/* <!-- Navbar content --> */}
            <NavDashboard/>                                 

            {/* <!-- sidebar --> */}                
              <Sidebar/>  

            <section className="flex md:ml-64 h-screen justify-center " >
                {children}
            </section>
            
        </div>
  )
}
