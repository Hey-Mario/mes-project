import { instance } from "@/common/axiosConfig";
import { NotificationTypeEnum } from "@/common/interfaces/notification/NotificationTypeEnum";
import { Observer } from "@/common/interfaces/notification/Observer";
import { notification } from "antd";

export class Operator implements Observer {
  constructor(private name: string) {}

  async update(event: string, type: NotificationTypeEnum = NotificationTypeEnum.INFO) {
    const message = `${this.name} notified of event: ${event}`;
    switch(type) {
      case NotificationTypeEnum.SUCCESS:
        notification.success({ message });
        break;
      case NotificationTypeEnum.WARNING:
        notification.warning({ message });
        break;
      case NotificationTypeEnum.ERROR:
        notification.error({ message });
        break;
      case NotificationTypeEnum.INFO:
      default:
        notification.info({ message });
        break;
    }
    console.log(message)
    const body = { name: this.name, event }
    await instance.post('/api/notify', body)
  }
}
