import { IProductionProcess } from "../interfaces/IProductionProcess";

export class ProductionManager {
    private productionProcess: IProductionProcess;

    constructor(productionProcess: IProductionProcess) {
        this.productionProcess = productionProcess;
    }

    startProduction() {
        this.productionProcess.startProcess();
    }

    endProduction() {
        this.productionProcess.endProcess();
    }
}