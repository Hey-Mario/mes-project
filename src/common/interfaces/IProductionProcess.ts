// Interface pour les abstractions de processus de production
export interface IProductionProcess {
    startProcess(): void;
    endProcess(): void;
}