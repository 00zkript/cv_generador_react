import { Outlet, NavLink, useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { FileText, Plus, LogOut, User, LayoutDashboard, UserCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function MainLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Sesión cerrada');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-card">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-6">
                            <h1 className="text-xl font-bold">CV Generator</h1>
                            <nav className="flex items-center gap-1">
                                <Button variant="ghost" asChild>
                                    <NavLink to="/dashboard" end>
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        Dashboard
                                    </NavLink>
                                </Button>
                                <Button variant="ghost" asChild>
                                    <NavLink to="/cvs">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Mis CVs
                                    </NavLink>
                                </Button>
                                <Button variant="ghost" asChild>
                                    <NavLink to="/cv/crear">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Nuevo CV
                                    </NavLink>
                                </Button>
                                <Button variant="ghost" asChild>
                                    <NavLink to="/mi-perfil">
                                        <UserCircle className="w-4 h-4 mr-2" />
                                        Mi Perfil
                                    </NavLink>
                                </Button>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <ModeToggle />
                            <div className="flex items-center gap-2 text-sm">
                                <User className="w-4 h-4" />
                                <span className="text-muted-foreground">{user?.name || user?.email}</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Salir
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}
