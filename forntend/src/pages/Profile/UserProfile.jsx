 // frontend/src/pages/Profile/UserProfile.jsx
    import React, {useState, useEffect} from 'react';
      import { useAuthStore } from '../../store/authStore';
     import Input from '../../components/Input';
        import { useNavigate } from 'react-router-dom';
          import { Mail, Lock, User, Phone, MapPin} from "lucide-react";
          const UserProfile = () => {
            const navigate = useNavigate()
              const { user, logout } = useAuthStore();
                const [loading, setLoading] = useState(true)

         useEffect(() => {
                if(!user){
                   navigate("/signin")
                }else{
                    setLoading(false)
              }
          }, [user])

            const handleLogout = ()=>{
                 logout()
                 navigate("/signin")
          }
          if (loading){
                 return
                    "Loading the data please wait…"
         }
            return (
                <div className="container mx-auto p-6 mt-8" dir="rtl">
                    <h2 className="text-2xl font-bold mb-4">
                       پروفایل من
                    </h2>
                    {user ? (<div className="bg-white rounded-md shadow-lg p-6">

                                      <p className="text-gray-700">{user.name}</p>
                                      <p className="text-gray-700">{user.email}</p>

                                 <button className="text-blue-500 hover:underline" onClick={handleLogout}>
                                    Sign Out
                                 </button>
                       </div> ) : (


                         "Loading the data please wait…"

                   )}
                </div>
            );
    };

        export default UserProfile;