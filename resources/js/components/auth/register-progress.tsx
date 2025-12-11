export default function RegisterProgress({
    step,
    totalSteps,
}: {
    step: number;
    totalSteps: number;
}) {
    const percentage = (step / totalSteps) * 100;

    return (
        <div className="w-full mb-6">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-sky-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="text-xs mt-2 text-center opacity-70">
                Paso {step} de {totalSteps}
            </p>
        </div>
    );
}
