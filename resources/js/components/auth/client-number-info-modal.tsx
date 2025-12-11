import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ClientNumberInfoModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ClientNumberInfoModal({ open, onClose }: ClientNumberInfoModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md md:max-w-lg lg:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        ¿Dónde encuentro mi número de cliente?
                    </DialogTitle>

                    <DialogDescription className="text-base leading-relaxed mt-2">
                        El número de cliente aparece en varios documentos enviados por nuestra empresa:
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 text-sm text-neutral-700">
                    <ul className="list-disc list-inside space-y-1">
                        <li>Facturas previas</li>
                        <li>Cotizaciones emitidas</li>
                        <li>Correos de confirmación</li>
                        <li>O puedes solicitarlo directamente a nuestros vendedores.</li>
                    </ul>

                    {/* --- IMAGEN DEMOSTRATIVA --- */}
                    <div className="w-full mt-4">
                        <img
                            src="/img/customerexample.png"
                            alt="Ejemplo de dónde encontrar el número de cliente"
                            className="rounded-lg border shadow-sm mx-auto"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={onClose} className="w-full">
                        Entendido
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
