   // frontend/src/Layout/AdminLayout.jsx
 import React from "react";
  import { Outlet, Link } from "react-router-dom";
 import AdminNavbar from "../components/Admin/AdminNavbar";

   const AdminLayout = () => {
     return (
        

          <div>
             <AdminNavbar/>
               
           </div>
     
     );
 };

     export default AdminLayout;