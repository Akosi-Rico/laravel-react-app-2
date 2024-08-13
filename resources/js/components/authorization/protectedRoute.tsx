import  { Navigate} from 'react-router-dom';
import React from 'react';
const ProtectedRoute = ({ element, requiredPermissions }) => {
    const permissions = tcode;

    // return true if at least one permission from the required permissions exists 
    const hasPermission = requiredPermissions.some(permission => permissions.includes(permission));

    /**

        If need All required permissions exist to be able to access page use this.
        const hasPermission = requiredPermissions.every(permission => permissions.includes(permission));
    */
   
    if (!hasPermission) {
        return <Navigate to="/unauthorized" />;
    }

    return element;
};

export default ProtectedRoute;

