import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import React from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}


interface AnimatedLinkProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {
  href: any;
  children: React.ReactNode;
  iconClass?: string;
}


const AnimatedLink = ({ href, children, iconClass, className, ...props }: AnimatedLinkProps) => {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors duration-300 w-fit ${className || ''}`}
      {...props}
    >
      {iconClass && <i className={`${iconClass} text-xl`}></i>}

      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-sky-600 transition-all duration-300 ease-out group-hover:w-full"></span>
      </span>
    </Link>
  );
};


export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="¡BIENVENIDO DE NUEVO!"
            description="Ingresa con tu cuenta"
        >
            <Head title="Iniciar Sesión" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    {canResetPassword && (
                                        <AnimatedLink
                                            href={request()}   
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                           ¿Olvidaste tu contraseña?
                                        </AnimatedLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Recuérdame</Label>
                            </div>

                            <Button
                                type="submit"
                                className="btn bg-sky-600 text-white hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                    INICIAR SESIÓN
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                ¿No tienes una cuenta?{' '}
                                <AnimatedLink href={register()} tabIndex={5}>
                                    Aplica para cliente
                                </AnimatedLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
