import { ModeToggle } from "@/components/ModeToggle";
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router";

export default function LayoutWeb() {
    return (
        <div>
            <ModeToggle/>
            <Outlet/>
            <ToastContainer />
        </div>
    );
}