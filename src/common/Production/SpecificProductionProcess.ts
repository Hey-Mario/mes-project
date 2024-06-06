import { IProductionProcess } from '../interfaces/IProductionProcess';

// Implémentation spécifique pour un type de processus de production
export class SpecificProductionProcess implements IProductionProcess {
    startProcess() {
        console.log("Démarrage du processus spécifique.");
    }
    endProcess() {
        console.log("Fin du processus spécifique.");
    }
}