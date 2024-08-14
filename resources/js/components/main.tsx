import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./app.tsx";
import RolePage from "./role.tsx";
import LoginPage from "./login.tsx";
import PermissionPage  from "./permission.tsx";
import RestrictedAccess from "./errors/UnAuthorized.tsx";
import PageNotFound from "./errors/PageNotFound.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { PublicImagePathContext } from "./UseContext/context.ts";
import ProtectedRoute from './authorization/protectedRoute.tsx';
const sampleRequiredAccess = ["Edit", "Full Access", "View Only"];
const roleAndPermissionRequiredAccess = ["Edit", "Full Access"];
const router = createBrowserRouter([
    {
        path: "/user",
        element:
        <PublicImagePathContext.Provider value={ publicImagePath }>
            <ProtectedRoute element={<HomePage />} requiredPermissions={sampleRequiredAccess} />
        </PublicImagePathContext.Provider>,
        errorElement:
            <PageNotFound/>
    },
    {
        path: "/role",
        element:
        <PublicImagePathContext.Provider value={ publicImagePath }>
            <ProtectedRoute element={<RolePage />} requiredPermissions={roleAndPermissionRequiredAccess} />
        </PublicImagePathContext.Provider>,
        errorElement:
            <PageNotFound/>
    },
    {
        path: "/permission",
        element:
        <PublicImagePathContext.Provider value={ publicImagePath }>
            <ProtectedRoute element={<PermissionPage />} requiredPermissions={roleAndPermissionRequiredAccess} />
        </PublicImagePathContext.Provider>,
        errorElement:
            <PageNotFound/>
    },
    {
        path: "/login",
        element: 
        <PublicImagePathContext.Provider value={ publicImagePath }>
            <LoginPage/>
        </PublicImagePathContext.Provider>,
        errorElement:
            <PageNotFound/>
    },
    {
        path: "/unauthorized",
        element:
            <RestrictedAccess/>
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<>
    <RouterProvider router={router} />
</>);
