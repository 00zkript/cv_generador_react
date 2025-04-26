import { Navigate, Outlet } from "react-router"

interface ProtectedRoute{
    isAllow: boolean;
    children: React.ReactNode;
    redirectTo: string;
}

export default function ProtectedRoute({ isAllow, children, redirectTo }: ProtectedRoute){
    if(!isAllow){
        return <Navigate to={redirectTo} />
    }

    return children || <Outlet/>
}