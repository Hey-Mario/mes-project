import { IProcess } from "../interfaces/IProcess";
import { message } from "antd";

export class BaseProcess implements IProcess {
  execute() {
    console.log("Executing base process");
  }
}

export class StatusNotificationDecorator implements IProcess {
  constructor(private process: IProcess) {}

  execute() {
    this.process.execute();
    message.success("Notification sent");
    console.log("Adding status notifications to the process");
  }
}
