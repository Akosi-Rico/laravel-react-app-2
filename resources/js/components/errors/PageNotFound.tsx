import React from "react";
import { useRoute } from 'ziggy-js';
import { Link } from 'react-router-dom';
export default function RestrictedAccess() {
    const route = useRoute();
    return(<>
        <div className="text-center p-60">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl font-medium text-gray-700 mt-4">User Management System</p>
            <p className="text-lg text-gray-500 mt-2">Page Not Found</p>
            <Link to={route("user.index")} className="
                mt-4 inline-block px-6 py-2  
                bg-blue-500 hover:bg-blue-600
                underline 
                rounded-md">Go to Home
            </Link>
        </div>
    </>);
}