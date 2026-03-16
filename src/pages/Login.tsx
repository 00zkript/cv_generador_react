import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'react-toastify';

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        try {
            await login(data);
            toast.success('Login exitoso');
            navigate('/dashboard');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || 'Error al iniciar sesión');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">CV Generator</h1>
                    <p className="text-muted-foreground mt-2">Inicia sesión en tu cuenta</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Contraseña
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
}
