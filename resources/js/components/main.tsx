import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./app.tsx";
import RolePage from "./role.tsx";
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
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<>
    <RouterProvider router={router} />
</>);
