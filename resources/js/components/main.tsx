import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./app.tsx";
import RolePage from "./role.tsx";
import LoginPage from "./login.tsx";
import PermissionPage  from "./permission.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { PublicImagePathContext } from "./UseContext/context.ts";
const router = createBrowserRouter([
    {
        path: "/user",
        element:
        <PublicImagePathContext.Provider value={ publicImagePath }>
            <HomePage/>
        </PublicImagePathContext.Provider>
    },
    {
        path: "/role",
        element:
        <PublicImagePathContext.Provider value={ publicImagePath }>
            <RolePage/> 
        </PublicImagePathContext.Provider>
    },
    {
        path: "/permission",
        element:
        <PublicImagePathContext.Provider value={ publicImagePath }>
            <PermissionPage/>
        </PublicImagePathContext.Provider>
    },
    {
        path: "/login",
        element: 
        <PublicImagePathContext.Provider value={ publicImagePath }>
            <LoginPage/>
        </PublicImagePathContext.Provider>
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<>
    <RouterProvider router={router} />
</>);
