import { IProductionProcess } from "../interfaces/IProductionProcess";

export class CarProductionProcess implements IProductionProcess {
    startProcess() {
        console.log("Démarrage du processus de production automobile.");
    }

    endProcess() {
        console.log("Fin du processus de production automobile.");
    }
}