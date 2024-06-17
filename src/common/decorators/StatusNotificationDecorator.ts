import { IProcess } from "../interfaces/IProcess";

export class BaseProcess implements IProcess {
  execute() {
    console.log("Executing base process");
  }
}

export class StatusNotificationDecorator implements IProcess {
  constructor(private process: IProcess) {}

  execute() {
    this.process.execute();
    console.log("Adding status notifications to the process");
  }
}
