import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'react-toastify';

const registerSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    lastname: z.string().optional(),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true);
        try {
            await registerUser({
                email: data.email,
                password: data.password,
                name: data.name,
                lastname: data.lastname,
            });
            toast.success('Registro exitoso');
            navigate('/dashboard');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || 'Error al registrarse');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">CV Generator</h1>
                    <p className="text-muted-foreground mt-2">Crea tu cuenta</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Nombre
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Juan"
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lastname" className="text-sm font-medium">
                            Apellido (opcional)
                        </label>
                        <Input
                            id="lastname"
                            type="text"
                            placeholder="Pérez"
                            {...register('lastname')}
                        />
                    </div>

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

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirmar Contraseña
                        </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Registrando...' : 'Registrarse'}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
