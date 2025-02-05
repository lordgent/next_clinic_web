import React  from 'react'
import Sidebar from '../sidebar-admin';

interface LayoutAdminInterface {
  children: React.ReactNode
}

const LayoutAdmin:React.FC<LayoutAdminInterface> = ({children}) => {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6">
            {children}
        </div>
      </div>
    );
  };
  
  export default LayoutAdmin;