import { IProductionProcess } from "../interfaces/IProductionProcess";

export class FoodProductionProcess implements IProductionProcess {
    startProcess() {
        console.log("Démarrage du processus de production alimentaire.");
    }

    endProcess() {
        console.log("Fin du processus de production alimentaire.");
    }
}