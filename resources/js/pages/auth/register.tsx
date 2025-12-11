import { useState } from "react";
import { login } from "@/routes";
import { store } from "@/routes/register";
import { Form, Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import AuthLayout from "@/layouts/auth-layout";
import RegisterProgress from "@/components/auth/register-progress";
import ClientNumberInfoModal from "@/components/auth/client-number-info-modal";
import React from "react";

export default function Register() {
    const [step, setStep] = useState<number>(1);

    const [hasClientNumber, setHasClientNumber] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const next = () => setStep((s) => s + 1);
    const back = () => setStep((s) => s - 1);

    const skipCompanyStep = () => {
        setHasClientNumber(true);
        setStep(1);
    };

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

    return (
        <AuthLayout
            title="REGÍSTRATE AHORA"
            description="Completa el formulario para crear tu cuenta con nosotros y comenzar a disfrutar de nuestros servicios."
        >
            <Head title="Registro" />

            {/* Modal */}
            <ClientNumberInfoModal
                open={showModal}
                onClose={() => setShowModal(false)}
            />

            {/* Barra de progreso */}
            <RegisterProgress step={step} totalSteps={hasClientNumber ? 1 : 2} />

            <Form
                {...store.form()}
                disableWhileProcessing
                resetOnSuccess={["password", "password_confirmation"]}
                className="flex flex-col gap-10"
            >
                {({ processing, errors }) => (
                    <>
                        {/* STEP 1 - Datos personales */}
                        {step === 1 && (
                            <div className="grid gap-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md border">
                                <h2 className="text-lg font-semibold">
                                    Información personal
                                </h2>

                                <div className="grid gap-2">
                                    <Label>Nombre</Label>
                                    <Input name="first_name" required />
                                    <InputError message={errors.first_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Apellido</Label>
                                    <Input name="last_name" required />
                                    <InputError message={errors.last_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Correo electrónico</Label>
                                    <Input name="email" type="email" required />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Teléfono</Label>
                                    <Input
                                        name="phone"
                                        placeholder="+58 000-0000000"
                                        required
                                    />
                                    <InputError message={errors.phone} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Contraseña</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        required
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Confirmar contraseña</Label>
                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        required
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                {/* Checkbox cliente existente */}
                                <div className="flex items-center gap-3 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={hasClientNumber}
                                        onChange={(e) =>
                                            setHasClientNumber(e.target.checked)
                                        }
                                        className="h-4 w-4"
                                    />
                                    <Label className="cursor-pointer">
                                        Ya tengo número de cliente
                                    </Label>

                                    {/* enlace para abrir modal */}
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                        className="text-sm ml-auto underline text-sky-600 opacity-70 hover:opacity-100"
                                    >
                                        ¿Dónde lo encuentro?
                                    </button>
                                </div>

                                {/* Input número cliente */}
                                {hasClientNumber && (
                                    <div className="grid gap-2 mt-4">
                                        <Label>Número de cliente</Label>
                                        <Input
                                            name="client_number"
                                            placeholder="A-0000"
                                            required
                                        />
                                    </div>
                                )}

                                {!hasClientNumber && (
                                    <Button 
                                    className="btn bg-sky-600 text-white hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 w-full"
                                    type="button"                                    
                                    onClick={next}
                                    >
                                        Siguiente
                                    </Button>
                                )}

                                {hasClientNumber && (
                                    <Button 
                                    className="btn bg-sky-600 text-white hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 w-full"
                                    type="submit"
                                    >
                                        {processing && <Spinner />}
                                        Finalizar registro
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* STEP 2 - Datos de la compañía */}
                        {!hasClientNumber && step === 2 && (
                            <div className="grid gap-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md border">
                                <h2 className="text-lg font-semibold">
                                    Información de la compañía
                                </h2>

                                <div className="grid gap-2">
                                    <Label>Nombre de la empresa</Label>
                                    <Input name="company_name" required />
                                </div>

                                <div className="grid gap-2">
                                    <Label>RIF</Label>
                                    <Input name="rif" required />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Dirección fiscal</Label>
                                    <Input name="address" required />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Button
                                        className="btn bg-white text-sky-600 hover:bg-sky-100 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 w-half"
                                        type="button"
                                        variant="outline"
                                        onClick={back}
                                    >
                                        Volver
                                    </Button>

                                    <Button 
                                    type="submit"
                                    className="btn bg-sky-600 text-white hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 w-full"
                                    >
                                        {processing && <Spinner />}
                                        Enviar aplicación
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Form>
                
            <p className="text-center text-sm mt-4 opacity-70">
            ¿Ya tienes tu cuenta?{" "}
            <AnimatedLink href={login()} tabIndex={-1}>
                Inicia sesión
            </AnimatedLink>
            </p>

        </AuthLayout>
    );
}
