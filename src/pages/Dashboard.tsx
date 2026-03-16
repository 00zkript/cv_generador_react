import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Plus, LogOut, User } from 'lucide-react';
import { useEffect } from 'react';

export default function Dashboard() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">CV Generator</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{user?.name || user?.email}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Cerrar sesión
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/cvs')}>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Mis CVs</h3>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold mt-2">Ver todos</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Gestiona tus currículums vitae
                            </p>
                        </div>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/cv/crear')}>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Nuevo CV</h3>
                                <Plus className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold mt-2">Crear</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Genera un nuevo currículum con IA
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Acciones rápidas</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Button variant="default" className="w-full" onClick={() => navigate('/cv/crear')}>
                            <Plus className="w-4 h-4 mr-2" />
                            Generar CV con IA
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => navigate('/cvs')}>
                            <FileText className="w-4 h-4 mr-2" />
                            Ver mis CVs
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
