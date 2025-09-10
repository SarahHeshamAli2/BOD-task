import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../featuers/auth/useAuth";
import { LogInIcon,LogOut,LogOutIcon } from "lucide-react";


export default function Sidebar() {
  const navigate = useNavigate()
const [isExpanded, setIsExpanded] = useState(() => {
  const saved = localStorage.getItem('sidebar');
  return saved ? JSON.parse(saved) : true; 
});
  

const toggleSidebar = () => {
    const newValue = !isExpanded;
    setIsExpanded(newValue);
    localStorage.setItem('sidebar', JSON.stringify(newValue));
};
const {user,logout} = useAuth()

const handleNavigateToLogin = ()=>{
  navigate('/login')

}

  return (
    <aside className={`${isExpanded ? 'w-64' : 'w-20'} min-h-screen bg-gray-800 text-white flex flex-col p-4 transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between mb-6">
        {isExpanded && (
          <h2 className="text-xl font-bold transition-opacity duration-200">Dashboard</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 ml-auto cursor-pointer"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink 
          to="/dashboard" 
          end
          className={({ isActive }) => 
            `${isActive ? "bg-gray-700" : "hover:bg-gray-700"} px-3 py-2 rounded transition-colors duration-200 flex items-center gap-3 group`
          }
          title={!isExpanded ? "Home" : ""}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {isExpanded && <span className="transition-opacity duration-200">Home</span>}
        </NavLink>

        <NavLink 
          to="/dashboard/products" 
          className={({ isActive }) => 
            `${isActive ? "bg-gray-700" : "hover:bg-gray-700"} px-3 py-2 rounded transition-colors duration-200 flex items-center gap-3 group`
          }
          title={!isExpanded ? "Items" : ""}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {isExpanded && <span className="transition-opacity duration-200">Items</span>}
        </NavLink>

      
      </nav>

 <div className="mt-auto pt-4 border-t border-gray-700">
          <div className={`${isExpanded && 'flex'} items-center gap-3 px-3 py-2 text-sm text-gray-300`}>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <button className="cursor-pointer">
             {
              user ?   <LogOut  onClick={logout}/> : <LogInIcon onClick={handleNavigateToLogin}/>
             }
            </button>
            </div>
            <span>{user ? user?.name : 'Login'}</span>
          </div>
        </div>
      
 
    </aside>
  );
}